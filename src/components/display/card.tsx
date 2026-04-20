import dayjs from 'dayjs';
import Link from 'next/link';

import { escapeHtml } from '@/lib/helper';

interface CardProps {
	id?: number;
	title: string;
	content: string;
	datetime: string;
}

export default function Card({ id, title, content, datetime }: CardProps) {
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
				<small className="text-xs text-(--muted)">
					{dayjs(datetime).format('DD MMM YYYY HH:mm')}
				</small>
			</div>
		</Link>
	);
}
