import { db, type NoteSyncState, type Notes } from '@/lib/db';

type RemoteNote = {
	id: number;
	clientId: string;
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

let activeSync: Promise<string> | null = null;

const createClientId = () =>
	typeof crypto !== 'undefined' && 'randomUUID' in crypto
		? crypto.randomUUID()
		: `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;

const toMillis = (value: string) => {
	const direct = Date.parse(value);
	if (!Number.isNaN(direct)) {
		return direct;
	}

	// Legacy local values may look like "YYYY-MM-DD HH:mm:ss" without timezone.
	const normalized = value.replace(' ', 'T');
	const withTimezone = /z$/i.test(normalized) ? normalized : `${normalized}Z`;
	const fallback = Date.parse(withTimezone);

	return Number.isNaN(fallback) ? 0 : fallback;
};

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

const runSyncLocalNotesIfPossible = async (): Promise<string> => {
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

	for (const note of localNotes) {
		if (note.id && !note.clientId) {
			const clientId = createClientId();
			await db.notes.update(note.id, { clientId });
			note.clientId = clientId;
		}
	}

	const localById = new Map(localNotes.map((note) => [note.id!, note]));
	const localByClientId = new Map(localNotes.map((note) => [note.clientId, note]));
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
		const now = new Date().toISOString();

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
		const now = new Date().toISOString();

		if (!mapping) {
			const localByClient = localByClientId.get(remote.clientId);
			if (localByClient?.id) {
				const now = new Date().toISOString();

				if (isRemoteNewer(remote.updatedAt, localByClient.updatedAt)) {
					await db.notes.update(localByClient.id, {
						title: remote.title,
						content: remote.content,
						font: remote.font,
						createdAt: remote.createdAt,
						updatedAt: remote.updatedAt,
						deletedAt: remote.deletedAt,
						clientId: remote.clientId,
					});
				}

				await db.noteSyncState.add({
					localId: localByClient.id,
					remoteId: remote.id,
					userId,
					localUpdatedAt: remote.updatedAt,
					remoteUpdatedAt: remote.updatedAt,
					syncedAt: now,
				});
				continue;
			}

			if (remote.deletedAt) {
				continue;
			}

			const newLocalId = await db.notes.add({
				clientId: remote.clientId,
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
				clientId: remote.clientId,
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
};

export async function syncLocalNotesIfPossible(): Promise<string> {
	if (activeSync) {
		return activeSync;
	}

	activeSync = runSyncLocalNotesIfPossible().finally(() => {
		activeSync = null;
	});

	return activeSync;
}
