import Link from 'next/link';

import Footer from '@/components/display/footer';
import Header from '@/components/display/header';
import { Notes } from '@/components/display/notes';
import { GithubIcons } from '@/components/display/github-icons';

export default function Main() {
	return (
		<main className="min-h-screen">
			<Header>
				<a
					href="https://github.com/conquera99/notes"
					target="_blank"
					rel="noreferrer noopener"
				>
					<GithubIcons />
				</a>
			</Header>
			<div className="px-4 pt-4">
				<Notes />
			</div>

			<Link
				href="/notes"
				className="rounded-full bg-red-500 flex text-4xl text-white pl-1 h-14 w-14 items-center justify-center fixed bottom-20 right-6"
			>
				+
			</Link>
			<Footer />
		</main>
	);
}
