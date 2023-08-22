import { Metadata } from 'next';

import Editor from '@/components/editor';
import StorageInfo from '@/components/storage-info';

export const metadata: Metadata = {
	title: 'Create Notes',
	description: 'Create notes',
};

export default function Detail({ params }: { params: { id: string } }) {
	return (
		<main className="min-h-screen">
			<Editor id={params.id} />
			<StorageInfo />
		</main>
	);
}