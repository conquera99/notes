import Link from 'next/link';

import SignOutButton from '@/components/auth/sign-out-button';
import Footer from '@/components/display/footer';
import Header from '@/components/display/header';
import { Notes } from '@/components/display/notes';
import { GithubIcons } from '@/components/display/github-icons';
import SyncBadge from '@/components/display/sync-badge';
import InitializeDB from '@/components/initialize';
import { getAuthSession } from '@/lib/auth';

export default async function Page() {
	const session = await getAuthSession();

	return (
		<main className="min-h-screen pb-20">
			<Header>
				<div className="ml-auto flex items-center gap-2 sm:gap-3">
					<SyncBadge />
					{session?.user?.email && (
						<span className="hidden max-w-40 truncate text-xs text-(--muted) sm:inline">
							{session.user.email}
						</span>
					)}
					<a
						href="https://github.com/conquera99/notes"
						target="_blank"
						rel="noreferrer noopener"
					>
						<GithubIcons />
					</a>
					{session?.user ? (
						<SignOutButton />
					) : (
						<Link
							href="/auth/sign-in"
							className="rounded-full border border-(--surface-border) px-3 py-1 text-xs font-medium text-(--foreground) transition hover:bg-black/5 sm:text-sm dark:hover:bg-white/10"
						>
							Sign in
						</Link>
					)}
				</div>
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
