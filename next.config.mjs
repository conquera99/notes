/** @type {import('next').NextConfig} */
const nextConfig = {
	productionBrowserSourceMaps: process.env.NODE_ENV === 'production',
	reactStrictMode: false,
	// swcMinify: process.env.NODE_ENV === 'production' ? true : false,
	compiler: {
		removeConsole:
			process.env.NODE_ENV === 'production'
				? {
						exclude: ['error'],
					}
				: {},
	},
};

export default nextConfig;
