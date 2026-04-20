'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';

import SignOutButton from '@/components/auth/sign-out-button';
import { GithubIcons } from '@/components/display/github-icons';
import SyncBadge from '@/components/display/sync-badge';

export default function AuthActions() {
	const { data: session, status } = useSession();
	const isAuthenticated = !!session?.user;

	return (
		<div className="ml-auto flex items-center gap-2 sm:gap-3">
			<SyncBadge />
			{isAuthenticated && session?.user?.email && (
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
			{isAuthenticated ? (
				<SignOutButton />
			) : (
				<Link
					href="/auth/sign-in"
					className="rounded-full border border-(--surface-border) px-3 py-1 text-xs font-medium text-(--foreground) transition hover:bg-black/5 sm:text-sm dark:hover:bg-white/10"
				>
					{status === 'loading' ? 'Loading...' : 'Sign in'}
				</Link>
			)}
		</div>
	);
}
