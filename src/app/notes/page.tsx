import { Metadata } from 'next';

import Editor from '@/components/editor';
import Footer from '@/components/display/footer';
import { Suspense } from 'react';

export const metadata: Metadata = {
	title: 'Create Notes',
	description: 'Create notes',
};

export default function Detail() {
	return (
		<main className="min-h-screen">
			<Suspense fallback={<div></div>}>
				<Editor />
			</Suspense>
			<Footer status="Ready" />
		</main>
	);
}
