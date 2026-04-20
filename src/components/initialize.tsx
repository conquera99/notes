'use client';

import { useEffect, useState } from 'react';

import { db } from '@/lib/db';
import { syncLocalNotesIfPossible } from '@/lib/note-sync';

export default function InitializeDB({
	onReadyAction,
}: {
	onReadyAction?: (ready: boolean, status: string) => void;
}) {
	const [isDBReady, setIsDBReady] = useState<boolean>(false);
	const [status, setStatus] = useState('initialize...');

	const publishStatus = (nextStatus: string) => {
		setStatus(nextStatus);
		window.dispatchEvent(
			new CustomEvent('notes-sync-status', {
				detail: { status: nextStatus },
			}),
		);
	};

	useEffect(() => {
		const runSync = async () => {
			try {
				publishStatus('Syncing...');
				const syncStatus = await syncLocalNotesIfPossible();
				publishStatus(syncStatus);
			} catch {
				publishStatus('Sync failed');
			}
		};

		if (db.isOpen() === false) {
			db.open()
				.then(() => {
					publishStatus('Ready');
					setIsDBReady(true);
					void runSync();
				})
				.catch((error) => {
					console.log('error', error);
					publishStatus('Error');
				});
		}

		db.on('ready', () => {
			console.log('db is ready');
			publishStatus('Ready');
			void runSync();
		});

		const onOnline = () => {
			void runSync();
		};

		window.addEventListener('online', onOnline);

		return () => {
			window.removeEventListener('online', onOnline);
		};
	}, []);

	useEffect(() => {
		if (isDBReady === true) {
			if (onReadyAction) onReadyAction(true, status);
		}
	}, [isDBReady, onReadyAction, status]);

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
