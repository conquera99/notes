import { Metadata } from 'next';

import Editor from '@/components/editor';
import Footer from '@/components/display/footer';

export const metadata: Metadata = {
	title: 'Create Notes',
	description: 'Create notes',
};

export default function Detail() {
	return (
		<main className="min-h-screen">
			<Editor />
			<Footer status="Ready" />
		</main>
	);
}
