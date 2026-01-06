import { FlameIcon, HistoryIcon, HomeIcon, ListVideoIcon, PlaySquareIcon, ThumbsUpIcon } from 'lucide-react';

export const publicRoutes = ['/', '/auth/new-verification'];

export const apiAuthPrefix = '/api/auth';

export const DEFAULT_LOGIN_REDIRECT = '/sign-in';

export const personalItems = [
	{
		title: 'History',
		url: '/playlists/history',
		icon: HistoryIcon,
		auth: true,
	},
	{
		title: 'Liked Videos',
		url: '/playlists/liked',
		icon: ThumbsUpIcon,
		auth: true,
	},
	{
		title: 'All playlists',
		url: '/playlists',
		icon: ListVideoIcon,
		auth: true,
	},
];

export const mainSectionItems = [
	{
		title: 'Home',
		url: '/',
		icon: HomeIcon,
	},
	{
		title: 'Subscription',
		url: '/subscribed/videos',
		icon: PlaySquareIcon,
		auth: true,
	},
	{
		title: 'Trending',
		url: '/feed/trending',
		icon: FlameIcon,
	},
];

export const authRoutes = ['/sign-in', '/auth/register', '/auth/error', '/auth/reset', '/auth/new-password'];

export const protectedRoutes = [
	...mainSectionItems
		.filter((item) => item.auth === true)
		.map((item) => {
			return item.url;
		}),
	,
	...personalItems
		.filter((item) => item.auth === true)
		.map((item) => {
			return item.url;
		}),
	,
	'/studio',
];
