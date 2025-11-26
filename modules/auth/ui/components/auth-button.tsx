'use client';

import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { signInToYoutube, signOutFromYoutube } from '@/lib/actions/loginLogoutActions';

import { UserCircleIcon } from 'lucide-react';
import { User } from 'next-auth';
import { useEffect, useState } from 'react';

const AuthButton = () => {
	const [user, setUser] = useState<User | undefined>();

	const loginClientBtn = async (provider: 'google') => {
		await signInToYoutube(provider);
	};

	const loggedInUser = useCurrentUser();

	const logoutBtn = async () => {
		await signOutFromYoutube();
		setUser(undefined);
	};

	useEffect(() => {
		if (loggedInUser) {
			setUser(loggedInUser);
		} else {
			setUser(undefined);
		}
	}, [user, setUser]);

	return (
		<>
			{user ? (
				<Button type="submit" onClick={() => logoutBtn()}>
					Sign Out
				</Button>
			) : (
				<Button
					variant="outline"
					className="px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
					onClick={() => loginClientBtn('google')}
				>
					<UserCircleIcon /> Sign In
				</Button>
			)}
		</>
	);
};

export default AuthButton;
