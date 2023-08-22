import dayjs from 'dayjs';
import Link from 'next/link';

interface CardProps {
	id?: number;
	title: string;
	datetime: string;
}

export default function Card({ id, title, datetime }: CardProps) {
	return (
		<Link
			href={`/${id || 'create'}`}
			className="border-gray-600 border-dotted border rounded-lg p-4 col-span-6 lg:col-span-3 xl:col-span-2 cursor-pointer hover:bg-slate-100 transition-all"
		>
			<h2 className="text-lg font-bold">{title || 'No Title'}</h2>
			<small className="text-sm">
				{dayjs(datetime).format('DD MMM YYYY HH:mm')}
			</small>
		</Link>
	);
}
