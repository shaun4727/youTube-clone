import { auth } from '@/auth';
import { AuthUIProvider } from '@/context/user-context';
import type { Metadata } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
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
				<body className={`${interFont.variable}`}>
					<Toaster />
					<AuthUIProvider>{children}</AuthUIProvider>
				</body>
			</html>
		</SessionProvider>
	);
}
