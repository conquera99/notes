import type { Metadata } from 'next';
import localFont from 'next/font/local';

import '@/styles/globals.css';

import ProgressBar from '@/components/progress-bar';
import { appConfig } from '@/lib/constant';

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
			<head>
				<meta name="application-name" content={appConfig.name} />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="default"
				/>
				<meta
					name="apple-mobile-web-app-title"
					content={appConfig.name}
				/>
				<meta name="description" content={appConfig.desc} />
				<meta name="format-detection" content="telephone=no" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta
					name="msapplication-config"
					content="/icons/browserconfig.xml"
				/>
				<meta name="msapplication-TileColor" content="#3B3B3B" />
				<meta name="msapplication-tap-highlight" content="no" />
				<meta name="theme-color" content="#FFFFFF" />

				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
				/>

				<link
					rel="icon"
					href="/icons/favicon.ico"
					type="image/svg+xml"
				/>

				<link
					rel="apple-touch-icon"
					href="/icons/apple-touch-icon.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="60x60"
					href="/icons/apple-touch-icon-60x60.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="76x76"
					href="/icons/apple-touch-icon-76x76.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="120x120"
					href="/icons/apple-touch-icon-120x120.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="152x152"
					href="/icons/apple-touch-icon-152x152.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/icons/apple-touch-icon.png"
				/>
				<link
					rel="apple-touch-icon"
					sizes="167x167"
					href="/icons/apple-touch-icon-167x167.png"
				/>

				<link
					rel="icon"
					type="image/png"
					sizes="16x16"
					href="/icons/favicon-16x16.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="32x32"
					href="/icons/favicon-32x32.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="48x48"
					href="/icons/favicon-48x48.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="64x64"
					href="/icons/favicon-64x64.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="96x96"
					href="/icons/favicon-96x96.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="128x128"
					href="/icons/favicon-128x128.png"
				/>
				<link
					rel="icon"
					type="image/png"
					sizes="256x256"
					href="/icons/favicon-256x256.png"
				/>

				<link rel="manifest" href="/manifest.json" />
				<link
					rel="mask-icon"
					href="/icons/safari-pinned-tab.svg"
					color="#ffffff"
				/>
				<link rel="shortcut icon" href="/favicon.ico" />

				<meta name="twitter:card" content={appConfig.desc} />
				<meta name="twitter:url" content={appConfig.url} />
				<meta name="twitter:title" content={appConfig.name} />
				<meta name="twitter:description" content={appConfig.desc} />
				<meta
					name="twitter:image"
					content={`${appConfig.url}/icons/android-chrome-192x192.png`}
				/>
				<meta name="twitter:creator" content="@conquera99" />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={appConfig.name} />
				<meta property="og:description" content={appConfig.desc} />
				<meta property="og:site_name" content={appConfig.name} />
				<meta property="og:url" content={appConfig.url} />
				<meta
					property="og:image"
					content={`${appConfig.url}/icons/apple-touch-icon.png`}
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
					href="/splash/iPhone_14_Pro_Max_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
					href="/splash/iPhone_14_Pro_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
					href="/splash/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
					href="/splash/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
					href="/splash/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
					href="/splash/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splash/iPhone_11__iPhone_XR_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)"
					href="/splash/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splash/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splash/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splash/12.9__iPad_Pro_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splash/11__iPad_Pro__10.5__iPad_Pro_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splash/10.9__iPad_Air_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splash/10.5__iPad_Air_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splash/10.2__iPad_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splash/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)"
					href="/splash/8.3__iPad_Mini_landscape.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					href="/splash/iPhone_14_Pro_Max_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					href="/splash/iPhone_14_Pro_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					href="/splash/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					href="/splash/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					href="/splash/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					href="/splash/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splash/iPhone_11__iPhone_XR_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)"
					href="/splash/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splash/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splash/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splash/12.9__iPad_Pro_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splash/11__iPad_Pro__10.5__iPad_Pro_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 820px) and (device-height: 1180px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splash/10.9__iPad_Air_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splash/10.5__iPad_Air_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splash/10.2__iPad_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splash/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png"
				/>
				<link
					rel="apple-touch-startup-image"
					media="screen and (device-width: 744px) and (device-height: 1133px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)"
					href="/splash/8.3__iPad_Mini_portrait.png"
				/>
			</head>
			<body className={nothingFont.className}>
				<ProgressBar />
				<main className="min-h-screen">{children}</main>
			</body>
		</html>
	);
}
