'use client';

import { signOut } from 'next-auth/react';

export default function SignOutButton() {
	return (
		<button
			type="button"
			onClick={() => signOut({ callbackUrl: '/auth/sign-in' })}
			className="rounded-full border border-(--surface-border) px-3 py-1 text-xs font-medium text-(--foreground) transition hover:bg-black/5 sm:text-sm dark:hover:bg-white/10"
		>
			Sign out
		</button>
	);
}