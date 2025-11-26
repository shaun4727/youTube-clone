import { auth } from '@/auth';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import './globals.css';

const interFont = Inter({
	variable: '--Inter',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Youtube Clone',
	description: 'Youtube Clone Project',
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();

	return (
		<SessionProvider session={session}>
			<html lang="en">
				<body className={`${interFont.variable}`}>{children}</body>
			</html>
		</SessionProvider>
	);
}
