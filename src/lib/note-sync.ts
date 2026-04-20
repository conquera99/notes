import dayjs from 'dayjs';

import { db, type NoteSyncState, type Notes } from '@/lib/db';

type RemoteNote = {
	id: number;
	title: string;
	content: string;
	font: string;
	createdAt: string;
	updatedAt: string;
	deletedAt: string | null;
};

type SyncSession = {
	user?: {
		id?: string;
	};
};

const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const toMillis = (value: string) => new Date(value).getTime();

const isRemoteNewer = (remote: string, local: string) =>
	toMillis(remote) > toMillis(local);

const deletionValue = (value?: string | null) => value ?? null;

const getSessionUserId = async () => {
	const response = await fetch('/api/auth/session', {
		method: 'GET',
		credentials: 'include',
	});

	if (!response.ok) {
		return null;
	}

	const session = (await response.json()) as SyncSession | null;
	return session?.user?.id || null;
};

const getRemoteNotes = async () => {
	const response = await fetch('/api/notes-sync', {
		method: 'GET',
		credentials: 'include',
	});

	if (!response.ok) {
		throw new Error('Unable to fetch remote notes.');
	}

	return (await response.json()) as { notes: RemoteNote[] };
};

const upsertRemoteNote = async (payload: {
	remoteId?: number;
	note: Notes;
}) => {
	const response = await fetch('/api/notes-sync', {
		method: 'POST',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});

	if (!response.ok) {
		throw new Error('Unable to sync note to remote.');
	}

	return (await response.json()) as { note: RemoteNote };
};

const removeRemoteNotes = async (ids: number[]) => {
	if (ids.length === 0) {
		return;
	}

	const response = await fetch('/api/notes-sync', {
		method: 'DELETE',
		credentials: 'include',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ ids }),
	});

	if (!response.ok) {
		throw new Error('Unable to delete remote notes.');
	}
};

export async function syncLocalNotesIfPossible(): Promise<string> {
	if (typeof window === 'undefined') {
		return 'ready';
	}

	if (!navigator.onLine) {
		return 'Offline';
	}

	const userId = await getSessionUserId();
	if (!userId) {
		return 'Guest mode';
	}

	if (!db.isOpen()) {
		await db.open();
	}

	const localNotes = await db.notes.toArray();
	const localById = new Map(localNotes.map((note) => [note.id!, note]));
	const syncRows = await db.noteSyncState.where('userId').equals(userId).toArray();

	const { notes: remoteNotes } = await getRemoteNotes();
	const remoteById = new Map(remoteNotes.map((note) => [note.id, note]));
	const syncByLocalId = new Map(syncRows.map((row) => [row.localId, row]));
	const syncByRemoteId = new Map(syncRows.map((row) => [row.remoteId, row]));

	// Rule: deleting local note should also remove remote note.
	const staleMappings = syncRows.filter((row) => !localById.has(row.localId));
	const remoteDeleteIds = staleMappings
		.map((row) => row.remoteId)
		.filter((id) => {
			const remote = remoteById.get(id);
			return Boolean(remote && !remote.deletedAt);
		});

	await removeRemoteNotes(remoteDeleteIds);
	if (staleMappings.length > 0) {
		await db.noteSyncState.bulkDelete(
			staleMappings
				.map((row) => row.id)
				.filter((id): id is number => typeof id === 'number'),
		);
	}

	// Push local notes, including tombstones, to remote.
	for (const localNote of localNotes) {
		if (!localNote.id) continue;

		const mapping = syncByLocalId.get(localNote.id);
		const mappedRemote = mapping ? remoteById.get(mapping.remoteId) : undefined;

		if (!mapping && localNote.deletedAt) {
			continue;
		}

		const remoteIsNewer = mappedRemote
			? isRemoteNewer(mappedRemote.updatedAt, localNote.updatedAt)
			: false;
		const hasDeletionMismatch = mappedRemote
			? deletionValue(localNote.deletedAt) !== deletionValue(mappedRemote.deletedAt)
			: false;
		const needsUpload =
			!mapping ||
			!mappedRemote ||
			(!remoteIsNewer &&
				(mapping.localUpdatedAt !== localNote.updatedAt ||
					mapping.remoteUpdatedAt !== mappedRemote.updatedAt ||
					hasDeletionMismatch));

		if (!needsUpload || remoteIsNewer) {
			continue;
		}

		const result = await upsertRemoteNote({
			remoteId: mapping?.remoteId,
			note: localNote,
		});
		const remote = result.note;
		const now = dayjs().format(DATETIME_FORMAT);

		const syncPayload: NoteSyncState = {
			localId: localNote.id,
			remoteId: remote.id,
			userId,
			localUpdatedAt: localNote.updatedAt,
			remoteUpdatedAt: remote.updatedAt,
			syncedAt: now,
		};

		if (mapping?.id) {
			await db.noteSyncState.update(mapping.id, syncPayload);
		} else {
			await db.noteSyncState.add(syncPayload);
		}

		syncByRemoteId.set(remote.id, {
			id: mapping?.id,
			...syncPayload,
		});
		remoteById.set(remote.id, remote);
	}

	// Pull remote notes and tombstones to local.
	for (const remote of remoteNotes) {
		const mapping = syncByRemoteId.get(remote.id);
		const now = dayjs().format(DATETIME_FORMAT);

		if (!mapping) {
			if (remote.deletedAt) {
				continue;
			}

			const newLocalId = await db.notes.add({
				title: remote.title,
				content: remote.content,
				font: remote.font,
				createdAt: remote.createdAt,
				updatedAt: remote.updatedAt,
				deletedAt: remote.deletedAt,
			});

			await db.noteSyncState.add({
				localId: newLocalId,
				remoteId: remote.id,
				userId,
				localUpdatedAt: remote.updatedAt,
				remoteUpdatedAt: remote.updatedAt,
				syncedAt: now,
			});
			continue;
		}

		const local = await db.notes.get(mapping.localId);
		if (!local) {
			continue;
		}

		if (isRemoteNewer(remote.updatedAt, local.updatedAt)) {
			await db.notes.update(mapping.localId, {
				title: remote.title,
				content: remote.content,
				font: remote.font,
				createdAt: remote.createdAt,
				updatedAt: remote.updatedAt,
				deletedAt: remote.deletedAt,
			});

			await db.noteSyncState.update(mapping.id!, {
				localUpdatedAt: remote.updatedAt,
				remoteUpdatedAt: remote.updatedAt,
				syncedAt: now,
			});
		}
	}

	return 'Synced';
}
