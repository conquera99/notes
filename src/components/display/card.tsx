import dayjs from 'dayjs';
import Link from 'next/link';

import { escapeHtml } from '@/lib/helper';

interface CardProps {
	id?: number;
	title: string;
	content: string;
	datetime: string;
	offlineReady?: boolean;
}

export default function Card({
	id,
	title,
	content,
	datetime,
	offlineReady = false,
}: CardProps) {
	return (
		<Link
			href={`/notes?id=${id || 'create'}`}
			className="group flex h-44 cursor-pointer flex-col justify-between rounded-2xl border border-(--surface-border) bg-(--surface) p-4 transition-all hover:-translate-y-0.5 hover:border-red-300/70 dark:hover:border-red-400/50"
		>
			<div className="flex h-full flex-col justify-between">
				<div>
					<h2 className="mb-2 w-full overflow-hidden text-ellipsis whitespace-nowrap text-xl font-semibold">
						{title || 'No Title'}
					</h2>
					<p className="line-clamp-3 text-sm text-(--muted)">
						{escapeHtml(content).substring(0, 120)}
					</p>
				</div>
				<div className="flex items-center justify-between gap-2">
					<small className="text-xs text-(--muted)">
						{dayjs(datetime).format('DD MMM YYYY HH:mm')}
					</small>
					{offlineReady ? (
						<span className="rounded-full border border-emerald-300/80 bg-emerald-100/80 px-2 py-0.5 text-[11px] font-medium text-emerald-800 dark:border-emerald-800/80 dark:bg-emerald-900/40 dark:text-emerald-300">
							Offline
						</span>
					) : null}
				</div>
			</div>
		</Link>
	);
}
