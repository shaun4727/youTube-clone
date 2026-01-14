'use client';

import { Button } from '@/components/ui/button';
import { useAuthUI } from '@/context/user-context';
import { SubscriptionButton } from '@/modules/subscriptions/ui/components/subscription-button';
import { User } from '@/types';
import { Avatar } from '@radix-ui/react-avatar';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface UserPageInfoProps {
	user: User | undefined;
}

export const UserPageInfo = ({ user }: UserPageInfoProps) => {
	const { userInfo: AuthUser } = useAuthUI();
	const router = useRouter();

	const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

	const createSubscriptionRecord = async () => {
		try {
			const formPayload = {
				viewerId: AuthUser?.id,
				creatorId: user?.id,
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
				router.refresh();
			}
		} catch (err) {
			console.log(err);
			return null;
		}
	};
	const ifUserSubscribedMethod = async () => {
		try {
			const res = await fetch(`/api/check-if-subscribed?userId=${AuthUser?.id}&creatorId=${user?.id}`, {
				method: 'GET',
			});
			const result = await res.json();

			if (res.status == 200) {
				setIsSubscribed(result);
			}
		} catch (err) {
			console.log(err);
			return null;
		}
	};

	useEffect(() => {
		ifUserSubscribedMethod();
	}, [user, AuthUser]);

	return (
		<div className="py-6">
			{/* mobile layout */}
			<div className="flex flex-col md:hidden">
				<div className="flex items-center gap-3">
					<Avatar>
						<Image
							src={user?.image as string}
							alt="profile"
							width={32}
							height={32}
							className="rounded-full object-cover"
						/>
					</Avatar>
					<div className="flex-1 min-w-0">
						<h1 className="text-xl font-bold">{user?.name}</h1>
						<div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
							<span>{user?._count?.subscribers} subscribers</span>
							<span>&bull;</span>
							<span>{user?._count?.videos} videos</span>
						</div>
					</div>
				</div>
				{AuthUser?.id === user?.id ? (
					<Button variant="secondary" asChild className="w-full mt-3 rounded-full">
						<Link href="/studio">Go to studio</Link>
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

			{/* Desktop Layout */}
			<div className="hidden md:flex items-start gap-4">
				<Avatar>
					<Image
						src={user?.image as string}
						alt="profile"
						width={120}
						height={120}
						className="rounded-full object-cover"
					/>
				</Avatar>
				<div className="flex-1 min-w-0">
					<h1 className="text-4xl font-bold">{user?.name}</h1>
					<div className="flex items-center gap-1 text-sm text-muted-foreground mt-3 mb-2">
						<span>{user?._count?.subscribers} subscribers</span>
						<span>&bull;</span>
						<span>{user?._count?.videos} videos</span>
					</div>
					{AuthUser?.id === user?.id ? (
						<Button variant="secondary" asChild className="mt-3 rounded-full">
							<Link href="/studio">Go to studio</Link>
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
			</div>
		</div>
	);
};
