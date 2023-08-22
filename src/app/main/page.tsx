import Link from 'next/link';

import StorageInfo from '@/components/storage-info';
import Header from '@/components/header';
import { Notes } from '@/components/notes';

export default function Main() {
	return (
		<main className="min-h-screen">
			<Header>
				<Link
					href="/notes"
					className="rounded-full bg-red-500 text-white px-4 py-1"
				>
					Create
				</Link>
			</Header>
			<div className="px-4">
				<Notes />
			</div>

			<StorageInfo />
		</main>
	);
}
