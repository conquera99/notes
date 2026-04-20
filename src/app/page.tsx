import Link from 'next/link';

import AuthActions from '@/components/auth/auth-actions';
import Footer from '@/components/display/footer';
import Header from '@/components/display/header';
import { Notes } from '@/components/display/notes';
import InitializeDB from '@/components/initialize';

export default function Page() {
	return (
		<main className="min-h-screen pb-20">
			<Header>
				<AuthActions />
			</Header>
			<div className="mx-auto w-full max-w-5xl px-3 pt-4 sm:px-4 sm:pt-5">
				<div className="mb-4 rounded-2xl border border-(--surface-border) bg-(--surface) p-4">
					<p className="text-sm text-(--muted)">All your notes in one calm workspace.</p>
				</div>
				<Notes />
			</div>

			<Link
				href="/notes"
				className="fixed right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] flex h-12 w-12 items-center justify-center rounded-full bg-(--accent) text-2xl text-(--accent-contrast) shadow-lg shadow-red-900/20 transition hover:scale-105 sm:bottom-20 sm:right-5 sm:h-14 sm:w-14 sm:text-3xl"
			>
				+
			</Link>
			<Footer status={<InitializeDB />} />
		</main>
	);
}
