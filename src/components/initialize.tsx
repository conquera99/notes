'use client';

import { useEffect, useState } from 'react';

import { db } from '@/lib/db';

export default function InitializeDB({
	onReady,
}: {
	onReady?: (ready: boolean, status: string) => void;
}) {
	const [isDBReady, setIsDBReady] = useState<boolean>(false);
	const [status, setStatus] = useState('initialize...');

	useEffect(() => {
		if (db.isOpen() === false) {
			db.open()
				.then(() => {
					setStatus('Ready');
					setIsDBReady(true);
				})
				.catch((error) => {
					console.log('error', error);
					setStatus('Error');
				});
		}

		db.on('ready', () => {
			console.log('db is ready');
			setStatus('Ready');
		});
	}, []);

	useEffect(() => {
		if (isDBReady === true) {
			if (onReady) onReady(true, status);
		}
	}, [isDBReady, onReady, status]);

	// This hook only run once in browser after the component is rendered for the first time.
	// It has same effect as the old componentDidMount lifecycle callback.
	useEffect(() => {
		if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
			return;
		}

		const registerServiceWorker = async () => {
			try {
				const registration = await navigator.serviceWorker.register(
					'/notes-worker.js',
					{ scope: '/' },
				);
				console.log('Service worker registered:', registration.scope);
			} catch (error) {
				console.log('Service worker registration failed:', error);
			}
		};

		void registerServiceWorker();
	}, []);

	return <span className="my-2 text-sm">{status}</span>;
}
