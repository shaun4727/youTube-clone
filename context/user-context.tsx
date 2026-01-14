// app/context/auth-ui-context.tsx
'use client';

import { useCurrentUser } from '@/hooks/use-current-user';
import { User } from '@/types';
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';

type AuthUIContextType = {
	userInfo: User | undefined;
	setUserInfo: (user: User | undefined) => void;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
};

const AuthUIContext = createContext<AuthUIContextType | null>(null);

export const AuthUIProvider = ({ children }: { children: React.ReactNode }) => {
	const user = useCurrentUser();
	const [userInfo, setUserInfo] = useState<User>();
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// console.log('context ', userInfo);

	// const refreshAuth = useCallback(() => {
	// 	router.refresh(); // 🔥 forces session revalidation
	// }, [router]);

	const getSubscription = async (user: User) => {
		try {
			const res = await fetch(`/api/subscription-section?viewerId=${user?.id}&creatorId=${2}`, {
				method: 'GET',
				cache: 'no-store',
			});

			const result = await res.json();
			return result;
		} catch (err) {
			console.log(err);
		}
	};

	const handleUser = async (user: User) => {
		let subList = [];
		if (user) {
			subList = await getSubscription(user);
		}
		const userDtl = {
			...user,
			subscriptions: subList?.subscriptionList || [],
		};
		setUserInfo(userDtl);
		setIsLoading(false);
	};

	useEffect(() => {
		handleUser(user as User);
	}, [isLoading]);

	return <AuthUIContext.Provider value={{ userInfo, setUserInfo, setIsLoading }}>{children}</AuthUIContext.Provider>;
	// return <AuthUIContext.Provider value={{ refreshAuth }}>{children}</AuthUIContext.Provider>;
};

export const useAuthUI = () => {
	const ctx = useContext(AuthUIContext);
	if (!ctx) {
		throw new Error('useAuthUI must be used inside AuthUIProvider');
	}
	return ctx;
};
