'use client';

import { InfiniteScroll } from '@/components/infinite-scroll';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthUI } from '@/context/user-context';
import { SubscriptionsListType } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SubscriptionItem } from '../components/subscription-item';

export const SubscriptionsSection = () => {
	const [offset, setOffset] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const { userInfo: user } = useAuthUI();
	const [subscriptionList, setSubscriptionList] = useState<SubscriptionsListType>({
		subscriptionsListWithLimit: [],
		hasNextPage: false,
	});

	const getSubscriptionsVideoList = async (currentOffset = 0, initialLoad = true) => {
		const count = currentOffset * 5;
		setIsLoading(true);
		const res = await fetch(`/api/subscription-list-api?offset=${count}&userId=${user?.id}`, {
			method: 'GET',
		});
		setIsLoading(false);

		const response = await res.json();

		setSubscriptionList((prev) => {
			if (initialLoad) return response;

			return {
				subscriptionsListWithLimit: [
					...prev.subscriptionsListWithLimit,
					...response.subscriptionsListWithLimit,
				],
				hasNextPage: response.hasNextPage,
			};
		});
	};

	const fetchNextSubscriptionPage = () => {
		setOffset((prev) => prev + 1);

		getSubscriptionsVideoList(offset, false);
	};

	useEffect(() => {
		getSubscriptionsVideoList();
	}, []);

	return (
		<>
			{!isLoading ? (
				<>
					<div className="flex flex-col gap-4 gap-y-10">
						{subscriptionList.subscriptionsListWithLimit.map((subscription) => (
							<Link
								href={`/users/${subscription?.creator?.id}`}
								key={`${subscription?.creatorId}-${subscription?.viewerId}`}
							>
								<SubscriptionItem
									name={subscription?.creator?.name}
									imageUrl={subscription?.creator?.image}
									subscriberCount={0}
									onUnsubscribe={() => {}}
								/>
							</Link>
						))}
					</div>
					<InfiniteScroll
						isManual={true}
						hasNextPage={subscriptionList.hasNextPage as boolean}
						isFetchingNextPage={false}
						fetchNextPage={fetchNextSubscriptionPage}
					/>
				</>
			) : (
				<div className="flex flex-col gap-2 w-full">
					{/* Thumbnail Skeleton */}
					<Skeleton className="aspect-video w-full rounded-xl" />

					<div className="flex gap-3">
						{/* Avatar Skeleton */}
						<div className="shrink-0">
							<Skeleton className="h-8 w-8 rounded-full" />
						</div>

						{/* Content Skeleton */}
						<div className="min-w-0 flex-1 flex flex-col gap-2">
							{/* Title Skeleton - Two lines to match line-clamp logic */}
							<div className="space-y-1">
								<Skeleton className="h-4 w-[90%]" />
								<Skeleton className="h-4 w-[60%] lg:block hidden" />
							</div>

							{/* User Info Skeleton */}
							<Skeleton className="h-3 w-1/3" />

							{/* Views & Date Skeleton */}
							<Skeleton className="h-3 w-1/2" />
						</div>

						{/* Menu Button Skeleton */}
						<div className="shrink-0">
							<Skeleton className="h-8 w-2 rounded-md" />
						</div>
					</div>
				</div>
			)}
		</>
	);
};
