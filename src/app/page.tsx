import { useEffect } from 'react';
import { Workbox } from 'workbox-window';

import InitializeDB from '@/components/initialize';

export default function Splash() {
	// This hook only run once in browser after the component is rendered for the first time.
	// It has same effect as the old componentDidMount lifecycle callback.
	useEffect(() => {
		if (
			typeof window !== 'undefined' &&
			'serviceWorker' in navigator &&
			window.workbox !== undefined
		) {
			const wb = new Workbox('/notes-worker.js');
			// add event listeners to handle any of PWA lifecycle event
			// https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
			wb.addEventListener('installed', (event) => {
				console.log(`Event ${event.type} is triggered.`);
				console.log(event);
			});

			wb.addEventListener('controlling', (event) => {
				console.log(`Event ${event.type} is triggered.`);
				console.log(event);
			});

			wb.addEventListener('activated', (event) => {
				console.log(`Event ${event.type} is triggered.`);
				console.log(event);
			});

			// A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
			// NOTE: MUST set skipWaiting to false in next.config.js pwa object
			// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
			const promptNewVersionAvailable = (_event: any) => {
				// `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
				// When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
				// You may want to customize the UI prompt accordingly.
				if (
					confirm(
						'A newer version of this web app is available, reload to update?',
					)
				) {
					wb.addEventListener('controlling', (_event) => {
						window.location.reload();
					});

					// Send a message to the waiting service worker, instructing it to activate.
					wb.messageSkipWaiting();
				} else {
					console.log(
						'User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time.',
					);
				}
			};

			wb.addEventListener('waiting', promptNewVersionAvailable);

			// ISSUE - this is not working as expected, why?
			// I could only make message event listenser work when I manually add this listenser into sw.js file
			wb.addEventListener('message', (event) => {
				console.log(`Event ${event.type} is triggered.`);
				console.log(event);
			});

			wb.addEventListener('redundant', (event) => {
				console.log(`Event ${event.type} is triggered.`);
				console.log(event);
			});

			// wb.addEventListener('externalinstalled', (event) => {
			// 	console.log(`Event ${event.type} is triggered.`);
			// 	console.log(event);
			// });

			// wb.addEventListener('externalactivated', (event) => {
			// 	console.log(`Event ${event.type} is triggered.`);
			// 	console.log(event);
			// });

			// never forget to call register as auto register is turned off in next.config.js
			wb.register();
		}
	}, []);

	return (
		<div className="flex min-h-screen items-center justify-center">
			<div className="text-center">
				<h1 className="px-4 text-3xl">NOTES.</h1>
				<small>Conquera99</small>

				<InitializeDB />
			</div>
		</div>
	);
}
