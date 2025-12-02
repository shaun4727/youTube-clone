import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				// You MUST replace this with the actual domain hosting your user images (e.g., Google, GitHub, etc.)
				hostname: 'lh3.googleusercontent.com',
				port: '',
				pathname: '**',
			},
			// Add other external domains if necessary
		],
	},
};

export default nextConfig;
