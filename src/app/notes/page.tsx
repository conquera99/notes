import { Metadata } from 'next';
import { Suspense } from 'react';

import Editor from '@/components/editor';
import Footer from '@/components/display/footer';

import '@/lib/env';

export const metadata: Metadata = {
	title: 'Create Notes',
	description: 'Create notes',
};

export default function Detail() {
	return (
		<main className="min-h-screen pb-20">
			<Suspense fallback={<div></div>}>
				<div className="w-full">
					<Editor />
				</div>
			</Suspense>
			<Footer status="Ready" />
		</main>
	);
}
