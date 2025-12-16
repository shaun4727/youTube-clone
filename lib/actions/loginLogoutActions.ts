'use server';

import { signIn, signOut } from '@/auth';

export const signInToYoutube = async (provider: 'google') => {
	await signIn(provider);
};

export const signOutFromYoutube = async () => {
	await signOut({ redirect: false });
};
