'use client';

import { useLiveQuery } from 'dexie-react-hooks';

import { db } from '@/lib/db';
import Card from '@/components/card';

export function Notes() {
	const notes = useLiveQuery(() => db.notes.reverse().sortBy('updatedAt'));

	if (notes?.length === 0) {
		return (
			<div className="h-56 bg-slate-50 px-4 flex items-center rounded-md text-center">
				No notes data available!
			</div>
		);
	}

	return (
		<div className="grid grid-cols-6 gap-4">
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
