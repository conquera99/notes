const STATIC_CACHE = 'notes-static-v1';
const PAGE_CACHE = 'notes-pages-v1';
const API_PREFIX = '/api/';

const PRECACHE_URLS = ['/', '/notes', '/manifest.json', '/offline.html'];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches
			.open(STATIC_CACHE)
			.then((cache) => cache.addAll(PRECACHE_URLS))
			.then(() => self.skipWaiting()),
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		caches
			.keys()
			.then((keys) =>
				Promise.all(
					keys
						.filter((key) => key !== STATIC_CACHE && key !== PAGE_CACHE)
						.map((key) => caches.delete(key)),
				),
			)
			.then(() => self.clients.claim()),
	);
});

const isStaticAsset = (pathname) => {
	return (
		pathname.startsWith('/_next/static/') ||
		/\.(?:js|css|png|jpg|jpeg|svg|webp|gif|woff|woff2|ttf|ico)$/i.test(pathname)
	);
};

self.addEventListener('fetch', (event) => {
	const request = event.request;
	const url = new URL(request.url);

	if (request.method !== 'GET' || url.origin !== self.location.origin) {
		return;
	}

	if (url.pathname.startsWith(API_PREFIX)) {
		return;
	}

	if (request.mode === 'navigate') {
		event.respondWith(handleNavigationRequest(request));
		return;
	}

	if (isStaticAsset(url.pathname)) {
		event.respondWith(cacheFirst(request));
		return;
	}

	event.respondWith(staleWhileRevalidate(request));
});

async function handleNavigationRequest(request) {
	try {
		const networkResponse = await fetch(request);
		const cache = await caches.open(PAGE_CACHE);
		cache.put(request, networkResponse.clone());
		return networkResponse;
	} catch {
		const cachedPage = await caches.match(request);
		if (cachedPage) {
			return cachedPage;
		}

		const fallbackPage = await caches.match('/');
		if (fallbackPage) {
			return fallbackPage;
		}

		return caches.match('/offline.html');
	}
}

async function cacheFirst(request) {
	const cached = await caches.match(request);
	if (cached) {
		return cached;
	}

	const response = await fetch(request);
	const cache = await caches.open(STATIC_CACHE);
	cache.put(request, response.clone());
	return response;
}

async function staleWhileRevalidate(request) {
	const cached = await caches.match(request);
	const networkPromise = fetch(request)
		.then(async (response) => {
			const cache = await caches.open(STATIC_CACHE);
			cache.put(request, response.clone());
			return response;
		})
		.catch(() => null);

	if (cached) {
		return cached;
	}

	const networkResponse = await networkPromise;
	if (networkResponse) {
		return networkResponse;
	}

	return new Response('Offline', {
		status: 503,
		statusText: 'Offline',
	});
}
