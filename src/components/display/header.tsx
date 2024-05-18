import Link from 'next/link';
import { ReactNode } from 'react';

interface HeaderProps {
	children?: ReactNode;
}

export default function Header({ children }: HeaderProps) {
	return (
		<div className="flex justify-between items-center px-4 py-2 backdrop-blur-sm bg-white/30 sticky top-0 border-b border-b-slate-100">
			<Link href="/">
				<h1 className="text-lg ">NOTES.</h1>
			</Link>
			{children}
		</div>
	);
}
