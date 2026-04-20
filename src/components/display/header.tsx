import Link from 'next/link';
import { ReactNode } from 'react';

interface HeaderProps {
	children?: ReactNode;
}

export default function Header({ children }: HeaderProps) {
	return (
		<div className="sticky top-0 z-30 border-b border-(--surface-border) bg-(--surface)/95 backdrop-blur-md">
			<div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-2 px-4 py-3">
			<Link href="/">
				<h1 className="text-sm font-semibold tracking-[0.2em] sm:text-base sm:tracking-[0.24em]">NOTES.</h1>
			</Link>
			{children}
			</div>
		</div>
	);
}
