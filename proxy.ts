import { NextResponse } from 'next/server';
import { auth } from './auth';
import { apiAuthPrefix, authRoutes, publicRoutes } from './route';

export default auth((req) => {
	const { nextUrl } = req;
	const isLoggedIn = !!req.auth;

	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);

	if (isApiAuthRoute) {
		return NextResponse.next();
	}

	// if (isAuthRoute) {
	// 	if (isLoggedIn) {
	// 		return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
	// 	}

	// 	return NextResponse.next();
	// }

	// if (!isLoggedIn && !isPublicRoute) {
	// 	return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
	// }

	return NextResponse.next();
});

export const config = {
	matcher: [],
	// matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
