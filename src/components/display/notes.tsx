'use client';

import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '@/lib/db';

import Card from '@/components/display/card';

export function Notes({ loading }: { loading?: boolean }) {
	const notes = useLiveQuery(() =>
		loading ? [] : db.notes.reverse().sortBy('updatedAt'),
	);

	if (loading === true) return <div>Loading...</div>;

	if (notes?.length === 0) {
		return (
			<div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-[color:var(--surface-border)] bg-[var(--surface)] px-4 text-center text-[color:var(--muted)]">
				No notes data available!
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{notes?.map((note) => (
				<Card
					id={note.id}
					key={note.id}
					title={note.title}
					content={note.content}
					datetime={note.updatedAt}
				/>
			))}
		</div>
	);
}
