'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function SignUpPage() {
	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setIsLoading(true);
		setErrorMessage('');

		const formData = new FormData(event.currentTarget);

		const payload = {
			name: String(formData.get('name') || '').trim(),
			email: String(formData.get('email') || '').trim().toLowerCase(),
			password: String(formData.get('password') || ''),
		};

		const response = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const body = (await response.json()) as { message?: string };
			setErrorMessage(body.message || 'Registration failed.');
			setIsLoading(false);
			return;
		}

		router.push('/auth/sign-in?registered=1');
		router.refresh();
	};

	return (
		<main className="mx-auto flex min-h-screen w-full max-w-md items-center px-4 py-10">
			<div className="w-full rounded-2xl border border-(--surface-border) bg-(--surface) p-6">
				<Link
					href="/"
					className="mb-4 inline-flex rounded-lg border border-(--surface-border) px-3 py-1.5 text-sm text-(--muted) transition hover:text-(--foreground)"
				>
					Back to Home / Notes
				</Link>
				<h1 className="mb-2 text-2xl font-semibold">Create account</h1>
				<p className="mb-6 text-sm text-(--muted)">Use your email and password to create an account.</p>

				{errorMessage && (
					<p className="mb-4 rounded-lg border border-red-300/60 bg-red-100/40 px-3 py-2 text-sm text-red-700 dark:text-red-300">
						{errorMessage}
					</p>
				)}

				<form className="space-y-4" onSubmit={onSubmit}>
					<div>
						<label htmlFor="name" className="mb-1 block text-sm font-medium">
							Name
						</label>
						<input
							id="name"
							name="name"
							type="text"
							required
							minLength={2}
							className="w-full rounded-lg border border-(--surface-border) bg-transparent px-3 py-2 outline-none focus:border-red-400"
						/>
					</div>
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
						{isLoading ? 'Creating account...' : 'Create account'}
					</button>
				</form>

				<p className="mt-5 text-sm text-(--muted)">
					Already have an account?{' '}
					<Link href="/auth/sign-in" className="font-medium text-(--foreground)">
						Sign in
					</Link>
				</p>
			</div>
		</main>
	);
}