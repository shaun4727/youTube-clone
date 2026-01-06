'use client';

import { InfiniteScroll } from '@/components/infinite-scroll';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthUI } from '@/context/user-context';
import { VideoGridCard } from '@/modules/videos/ui/components/video-grid-card';
import { VideoRowCard } from '@/modules/videos/ui/components/video-row-card';
import { LikedVideoType } from '@/types';
import { useEffect, useState } from 'react';

export const LikedVideosSection = () => {
	const [offset, setOffset] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const { userInfo: user } = useAuthUI();
	const [videoList, setVideoList] = useState<LikedVideoType>({
		likedVideosWithLimit: [],
		hasNextPage: false,
	});

	const getLikedVideoList = async (currentOffset = 0, initialLoad = true) => {
		const count = currentOffset * 5;
		setIsLoading(true);
		const res = await fetch(`/api/liked-videos?offset=${count}&userId=${user?.id}`, {
			method: 'GET',
		});
		setIsLoading(false);

		const response = await res.json();

		setVideoList((prev) => {
			if (initialLoad) return response;

			return {
				HistoryVideosWithLimit: [...prev.likedVideosWithLimit, ...response.historyVideosWithLimit],
				hasNextPage: response.hasNextPage,
			};
		});
	};

	const fetchNextVideoPage = () => {
		setOffset((prev) => prev + 1);

		getLikedVideoList(offset, false);
	};

	useEffect(() => {
		getLikedVideoList();
	}, []);

	return (
		<>
			{!isLoading ? (
				<>
					<div className="flex flex-col gap-4 gap-y-10 md:hidden">
						{videoList.likedVideosWithLimit.map((video) => (
							<VideoGridCard key={video.id} data={video} />
						))}
					</div>
					<div className="hidden flex-col gap-4 md:flex">
						{videoList.likedVideosWithLimit.map((video) => (
							<VideoRowCard key={video.id} data={video} size="compact" />
						))}
					</div>
					<InfiniteScroll
						isManual={true}
						hasNextPage={videoList.hasNextPage as boolean}
						isFetchingNextPage={false}
						fetchNextPage={fetchNextVideoPage}
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
