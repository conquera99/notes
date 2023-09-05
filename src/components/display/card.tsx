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
			className="h-40 border-gray-600 border-dotted border rounded-lg p-4 col-span-6 lg:col-span-3 xl:col-span-2 cursor-pointer hover:bg-slate-100 transition-all dark:hover:bg-gray-900"
		>
			<div className="flex flex-col justify-between h-full">
				<div>
					<h2 className="text-xl font-bold w-full text-ellipsis overflow-hidden whitespace-nowrap mb-1">
						{title || 'No Title'}
					</h2>
					<p>{escapeHtml(content).substring(0, 80)}</p>
				</div>
				<small className="text-xs">
					{dayjs(datetime).format('DD MMM YYYY HH:mm')}
				</small>
			</div>
		</Link>
	);
}
