'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuthUI } from '@/context/user-context';
import { SubscriptionButton } from '@/modules/subscriptions/ui/components/subscription-button';
import { UserInfo } from '@/modules/users/ui/components/userInfo';
import { SingleVideoTypeWithUser, User } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface VideoOwnerProps {
	user: User | null;
	video: SingleVideoTypeWithUser;
}

export const VideoOwner = ({ user = null, video }: VideoOwnerProps) => {
	const { userInfo, setIsLoading } = useAuthUI();
	const [isSubscribed, setIsSubscribed] = useState(false);

	const fetchSubscriptionStatus = async () => {
		if (video?.user?.id === userInfo?.id || !video || !userInfo) {
			setIsSubscribed(false);
			return;
		}
		try {
			const res = await fetch(`/api/subscription-section?creatorId=${video?.user?.id}&viewerId=${userInfo?.id}`, {
				method: 'GET',
				cache: 'no-store',
			});
			if (res.status == 200) {
				const result: { status: boolean } = await res.json();

				setIsSubscribed(result.status);
			}
		} catch (err) {
			console.log(err);
			return null;
		}
	};

	const createSubscriptionRecord = async () => {
		try {
			const formPayload = {
				viewerId: userInfo?.id,
				creatorId: video?.user?.id,
			};
			const res = await fetch(`/api/subscription-section`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formPayload),
			});
			const result = await res.json();
			if (res.status == 200) {
				if (result) {
					setIsSubscribed(true);
				} else {
					setIsSubscribed(false);
				}
			}
			// router.refresh();
			setIsLoading(true);
		} catch (err) {
			console.log(err);
			return null;
		}
	};

	useEffect(() => {
		fetchSubscriptionStatus();

		return () => {
			setIsSubscribed(false);
		};
	}, []);

	return (
		<div className="flex items-center sm:items-start justify-between sm:justify-start gap-3 min-w-0">
			<Link href={`/users/${user?.id}`}>
				<div className="flex items-center gap-3 min-w-0">
					<Avatar>
						<Image
							src={user?.image as string}
							alt="profile"
							width={32}
							height={32}
							className="rounded-full object-cover"
						/>
					</Avatar>
					<div className="flex flex-col gap-1">
						<UserInfo size="lg" name={user?.name} />
						<span>{userInfo?.subscriptions?.length} subscriber</span>
					</div>
				</div>
			</Link>
			{userInfo?.id === user?.id ? (
				<Button variant="secondary" className="rounded-full" asChild>
					<Link href={`/studio/videos/${video?.id}`}>Edit Video</Link>
				</Button>
			) : (
				<SubscriptionButton
					onClick={createSubscriptionRecord}
					disabled={false}
					isSubscribed={isSubscribed}
					className="flex-none"
				/>
			)}
		</div>
	);
};
