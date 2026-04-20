'use client';

import { useEffect, useMemo, useState } from 'react';

type SyncStatus =
	| 'initialize...'
	| 'Ready'
	| 'Syncing...'
	| 'Synced'
	| 'Offline'
	| 'Guest mode'
	| 'Sync failed'
	| 'Error';

const getBadgeStyle = (status: SyncStatus) => {
	switch (status) {
		case 'Synced':
			return 'border-emerald-300/70 bg-emerald-100/50 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300';
		case 'Syncing...':
			return 'border-amber-300/70 bg-amber-100/50 text-amber-700 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-300';
		case 'Offline':
			return 'border-slate-300/70 bg-slate-100/50 text-slate-700 dark:border-slate-500/40 dark:bg-slate-500/10 dark:text-slate-300';
		case 'Guest mode':
			return 'border-sky-300/70 bg-sky-100/50 text-sky-700 dark:border-sky-500/40 dark:bg-sky-500/10 dark:text-sky-300';
		case 'Sync failed':
		case 'Error':
			return 'border-red-300/70 bg-red-100/50 text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-300';
		default:
			return 'border-(--surface-border) bg-(--surface) text-(--muted)';
	}
};

export default function SyncBadge() {
	const [status, setStatus] = useState<SyncStatus>(() => {
		if (typeof window !== 'undefined' && !navigator.onLine) {
			return 'Offline';
		}

		return 'initialize...';
	});

	useEffect(() => {
		const onStatus = (event: Event) => {
			const customEvent = event as CustomEvent<{ status?: SyncStatus }>;
			if (customEvent.detail?.status) {
				setStatus(customEvent.detail.status);
			}
		};

		const onOnline = () => setStatus('Ready');
		const onOffline = () => setStatus('Offline');

		window.addEventListener('notes-sync-status', onStatus as EventListener);
		window.addEventListener('online', onOnline);
		window.addEventListener('offline', onOffline);

		return () => {
			window.removeEventListener(
				'notes-sync-status',
				onStatus as EventListener,
			);
			window.removeEventListener('online', onOnline);
			window.removeEventListener('offline', onOffline);
		};
	}, []);

	const style = useMemo(() => getBadgeStyle(status), [status]);

	return (
		<span
			className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-wide sm:text-xs ${style}`}
		>
			{status}
		</span>
	);
}
