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
	const [userInfo, setUserInfo] = useState<User | undefined>(undefined);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// console.log('context ', userInfo);

	// const refreshAuth = useCallback(() => {
	// 	router.refresh(); // 🔥 forces session revalidation
	// }, [router]);

	const handleUser = async (user: User | undefined) => {
		setUserInfo(user);
		setIsLoading(false);
	};

	useEffect(() => {
		handleUser(user);
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
