'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { db } from '@/lib/db';

export default function InitializeDB() {
	const router = useRouter();

	const [isDBReady, setIsDBReady] = useState<boolean>(false);
	const [status, setStatus] = useState('initialize...');

	useEffect(() => {
		if (db.isOpen() === false) {
			db.open()
				.then(() => {
					setStatus('initialized success');
					setIsDBReady(true);
				})
				.catch((error) => {
					console.log('error', error);
					setStatus('initialized error');
				});
		}

		db.on('ready', () => {
			console.log('db is ready');
		});
	}, []);

	useEffect(() => {
		if (isDBReady === true) {
			router.push('/main');
		}
	}, [isDBReady, router]);

	return <div className="my-2 text-sm">{status}</div>;
}
