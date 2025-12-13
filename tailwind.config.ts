// tailwind.config.ts (NEW FILE)
import { withUt } from 'uploadthing/tw';

export default withUt({
	// IMPORTANT: Define your content paths here so Tailwind knows
	// where to look for the utility classes used in your app.
	content: [
		'./src/**/*.{ts,tsx,mdx}', // Your app files
		'./app/**/*.{ts,tsx,mdx}', // Common Next.js app directory structure
		// ... any other paths
	],

	// You can leave the rest empty to use Tailwind's defaults,
	// or customize it as needed.
	theme: {
		extend: {},
	},
	plugins: [],
});
