'use client';

import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '@/lib/db';

import Card from '@/components/display/card';

export function Notes({ loading }: { loading?: boolean }) {
	const notes = useLiveQuery(async () => {
		if (loading) {
			return [];
		}

		const allNotes = await db.notes.toArray();

		return allNotes
			.filter((note) => !note.deletedAt)
			.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
	}, [loading]);

	if (loading === true) return <div>Loading...</div>;

	if (notes?.length === 0) {
		return (
			<div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-(--surface-border) bg-(--surface) px-4 text-center text-(--muted)">
				No notes data available!
			</div>
		);
	}

	const offlineReadyCount = notes?.length ?? 0;
	const offlineLabel = offlineReadyCount === 1 ? 'note' : 'notes';

	return (
		<>
			<div className="mb-3 rounded-xl border border-(--surface-border) bg-(--surface) px-3 py-2 text-sm text-(--muted)">
				Offline access: {offlineReadyCount} {offlineLabel} can be opened without internet.
			</div>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
				{notes?.map((note) => (
					<Card
						id={note.id}
						key={note.id}
						title={note.title}
						content={note.content}
						datetime={note.updatedAt}
						offlineReady
					/>
				))}
			</div>
		</>
	);
}
