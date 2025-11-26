import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { getAccountByUserId } from './data/accounts';
import { getUserById } from './data/user';
import prisma from './lib/db';

export const { handlers, signIn, signOut, auth } = NextAuth({
	providers: [Google],
	adapter: PrismaAdapter(prisma),
	pages: {
		signIn: '/sign-in',
	},
	events: {
		async linkAccount({ user }) {
			await prisma.user.update({
				where: { id: user.id },
				data: { emailVerified: new Date() },
			});
		},
	},
	session: { strategy: 'jwt' },
	callbacks: {
		async session({ token, session }) {
			if (token.sub && session.user) {
				session.user.id = token.sub;
			}

			if (session.user) {
				session.user.name = token.name;
				session.user.email = token.email as string;
			}

			// console.log(session);

			return session;
		},
		async jwt({ token }) {
			if (!token.sub) {
				return token;
			}
			const existingUser = await getUserById(token.sub);

			if (!existingUser) {
				return token;
			}

			const existingAccount = await getAccountByUserId(existingUser.id);

			token.isOAuth = !!existingAccount;
			token.name = existingUser.name;
			token.email = existingUser.email;

			return token;
		},
	},
});
