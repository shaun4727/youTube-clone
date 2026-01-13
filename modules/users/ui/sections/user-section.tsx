'use client';

import { User } from '@/types';
import { useEffect, useState } from 'react';
import { UserPageBanner } from '../components/user-page-banner';
import { UserPageInfo } from '../components/user-page-info';

interface UserSectionProps {
	userId: string;
}

export const UserSection = ({ userId }: UserSectionProps) => {
	const [userInfo, setUserInfo] = useState<User>();

	const getUserDataWithId = async (userID: string | null | undefined) => {
		try {
			const response = await fetch(`/api/user-information?userId=${userID}`, {
				method: 'GET',
			});
			const result = await response.json();
			if (response.status === 200) {
				setUserInfo(result);
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getUserDataWithId(userId);
	}, [userId]);

	return (
		<div className="flex flex-col">
			{/* <pre> {JSON.stringify(userInfo, null, 2)} </pre> */}
			{userInfo && (
				<>
					<UserPageBanner user={userInfo} getUserData={getUserDataWithId} />
					<UserPageInfo user={userInfo} />
				</>
			)}
		</div>
	);
};
