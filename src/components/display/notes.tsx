'use client';

import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect, useMemo, useRef, useState } from 'react';

import { db } from '@/lib/db';

import Card from '@/components/display/card';

export function Notes({ loading }: { loading?: boolean }) {
	const [searchQuery, setSearchQuery] = useState('');
	const searchInputRef = useRef<HTMLInputElement>(null);

	const notes = useLiveQuery(async () => {
		if (loading) {
			return [];
		}

		const allNotes = await db.notes.toArray();

		return allNotes
			.filter((note) => !note.deletedAt)
			.sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));
	}, [loading]);

	const filteredNotes = useMemo(() => {
		const keyword = searchQuery.trim().toLowerCase();
		if (!keyword) {
			return notes ?? [];
		}

		return (notes ?? []).filter((note) => {
			const title = note.title.toLowerCase();
			const content = note.content.toLowerCase();
			return title.includes(keyword) || content.includes(keyword);
		});
	}, [notes, searchQuery]);

	useEffect(() => {
		const handleSlashShortcut = (event: KeyboardEvent) => {
			if (
				event.key !== '/' ||
				event.altKey ||
				event.ctrlKey ||
				event.metaKey ||
				event.shiftKey
			) {
				return;
			}

			const target = event.target as HTMLElement | null;
			const isTypingContext =
				target?.tagName === 'INPUT' ||
				target?.tagName === 'TEXTAREA' ||
				target?.isContentEditable;

			if (isTypingContext) {
				return;
			}

			event.preventDefault();
			searchInputRef.current?.focus();
		};

		window.addEventListener('keydown', handleSlashShortcut);
		return () => window.removeEventListener('keydown', handleSlashShortcut);
	}, []);

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
	const hasSearch = searchQuery.trim().length > 0;

	return (
		<>
			<div className="mb-3 rounded-xl border border-(--surface-border) bg-(--surface) px-3 py-2 text-sm text-(--muted)">
				Offline access: {offlineReadyCount} {offlineLabel} can be opened without internet.
			</div>
			<div className="mb-4">
				<label htmlFor="notes-search" className="sr-only">
					Search notes
				</label>
				<div className="relative">
					<span
						aria-hidden="true"
						className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-(--muted)"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							className="h-4 w-4"
						>
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.3-4.3" />
						</svg>
					</span>
					<input
						ref={searchInputRef}
						id="notes-search"
						type="search"
						value={searchQuery}
						onChange={(event) => setSearchQuery(event.target.value)}
						placeholder="Search notes by title or content"
						className="w-full rounded-xl border border-(--surface-border) bg-(--surface) py-2 pr-14 pl-9 text-sm outline-none transition focus:border-red-300/80 focus:ring-2 focus:ring-red-200/60 dark:focus:border-red-400/70 dark:focus:ring-red-500/20"
					/>
					<span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-(--muted)">
						/
					</span>
				</div>
			</div>
			{filteredNotes.length === 0 ? (
				<div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-(--surface-border) bg-(--surface) px-4 text-center text-(--muted)">
					{hasSearch
						? 'No notes match your search.'
						: 'No notes data available!'}
				</div>
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{filteredNotes.map((note) => (
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
			)}
		</>
	);
}
