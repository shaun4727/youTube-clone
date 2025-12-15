import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */

	/**
	 * reactStrictMode:false
	 * this line will disable reload two times
	 *
	 */
	// reactStrictMode: false,

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
};

export default nextConfig;
