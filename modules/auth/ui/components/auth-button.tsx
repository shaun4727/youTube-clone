'use client';

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { signInToYoutube, signOutFromYoutube } from '@/lib/actions/loginLogoutActions';

import { UserCircleIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

const AuthButton = () => {
	const [user, setUser] = useState<ReturnType<typeof useCurrentUser>>(undefined);
	const data = useCurrentUser();

	useEffect(() => {
		setUser(data);
	}, [data]);

	const logOutFunc = () => {
		try {
			setUser(undefined);
			signOutFromYoutube();
		} catch (err) {
			console.log('auth-button comp --', err);
		}
	};

	return (
		<>
			{user ? (
				<Button type="submit" onClick={() => logOutFunc()}>
					Sign Out
				</Button>
			) : (
				<Button
					variant="outline"
					className="px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
					onClick={() => signInToYoutube('google')}
				>
					<UserCircleIcon /> Sign In
				</Button>
			)}
		</>
	);
};

export default AuthButton;
