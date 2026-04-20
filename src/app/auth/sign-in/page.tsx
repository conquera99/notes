'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, Suspense, useMemo, useState } from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPage() {
	return (
		<Suspense fallback={null}>
			<SignInContent />
		</Suspense>
	);
}

function SignInContent() {
	const router = useRouter();
	const searchParams = useSearchParams();

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const registered = useMemo(
		() => searchParams.get('registered') === '1',
		[searchParams],
	);

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		setErrorMessage('');

		const formData = new FormData(event.currentTarget);
		const email = String(formData.get('email') || '').trim().toLowerCase();
		const password = String(formData.get('password') || '');

		const result = await signIn('credentials', {
			email,
			password,
			redirect: false,
			callbackUrl: '/',
		});

		if (!result || result.error) {
			setErrorMessage('Invalid email or password.');
			setIsLoading(false);
			return;
		}

		router.push(result.url || '/');
		router.refresh();
	};

	return (
		<main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-10">
			<div className="w-full rounded-2xl border border-(--surface-border) bg-(--surface) p-6">
				<h1 className="mb-2 text-2xl font-semibold">Welcome back</h1>
				<p className="mb-6 text-sm text-(--muted)">Sign in to continue to your notes.</p>

				{registered && (
					<p className="mb-4 rounded-lg border border-emerald-300/60 bg-emerald-100/40 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300">
						Account created. You can sign in now.
					</p>
				)}

				{errorMessage && (
					<p className="mb-4 rounded-lg border border-red-300/60 bg-red-100/40 px-3 py-2 text-sm text-red-700 dark:text-red-300">
						{errorMessage}
					</p>
				)}

				<form className="space-y-4" onSubmit={onSubmit}>
					<div>
						<label htmlFor="email" className="mb-1 block text-sm font-medium">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							className="w-full rounded-lg border border-(--surface-border) bg-transparent px-3 py-2 outline-none focus:border-red-400"
						/>
					</div>
					<div>
						<label htmlFor="password" className="mb-1 block text-sm font-medium">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							minLength={8}
							className="w-full rounded-lg border border-(--surface-border) bg-transparent px-3 py-2 outline-none focus:border-red-400"
						/>
					</div>
					<button
						type="submit"
						disabled={isLoading}
						className="w-full rounded-lg bg-(--accent) px-4 py-2 font-medium text-(--accent-contrast) disabled:opacity-70"
					>
						{isLoading ? 'Signing in...' : 'Sign in'}
					</button>
				</form>

				<p className="mt-5 text-sm text-(--muted)">
					No account yet?{' '}
					<Link href="/auth/sign-up" className="font-medium text-(--foreground)">
						Create one
					</Link>
				</p>
			</div>
		</main>
	);
}