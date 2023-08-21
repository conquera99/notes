import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/styles/globals.css';

const nothingFont = localFont({ src: '../styles/font/nothing.ttf' });

export const metadata: Metadata = {
	title: 'Notes.',
	description: 'created by conquera99',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={nothingFont.className}>
				<main className="min-h-screen">{children}</main>
			</body>
		</html>
	);
}
