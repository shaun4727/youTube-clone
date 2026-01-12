'use client';

import { InfiniteScroll } from '@/components/infinite-scroll';
import { VideoGridCard } from '@/modules/videos/ui/components/video-grid-card';
import { UserVideoType } from '@/types';
import { useCallback, useEffect, useState } from 'react';

export const UserVideosSection = ({ userId }: { userId: string | undefined }) => {
	const [offset, setOffset] = useState(0);
	const [videoList, setVideoList] = useState<UserVideoType>({
		userVideosWithLimit: [],
		hasNextPage: false,
	});

	// 1. Wrap in useCallback and add types
	const getUserVideoList = useCallback(async (userId: string | undefined, currentOffset = 0, initialLoad = true) => {
		const count = currentOffset * 5;
		const res = await fetch(`/api/user-video?offset=${count}&userId=${userId ?? ''}`);
		const response = await res.json();

		setVideoList((prev) => {
			if (initialLoad) return response;
			return {
				userVideosWithLimit: [...prev.userVideosWithLimit, ...response.userVideosWithLimit], // Fixed typo in response field name
				hasNextPage: response.hasNextPage,
			};
		});
	}, []); // Empty dependency array if it doesn't rely on local state

	const fetchNextVideoPage = () => {
		const nextOffset = offset + 1;
		setOffset(nextOffset);
		getUserVideoList(userId, nextOffset, false);
	};

	useEffect(() => {
		setOffset(0); // Reset offset when category changes
		getUserVideoList(userId, 0, true);
	}, [userId, getUserVideoList]);

	return (
		<div>
			<div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-4 [@media(min-width:2200px)]:grid-cols-4">
				{videoList.userVideosWithLimit.map((video) => (
					<VideoGridCard key={video.id} data={video} />
				))}
			</div>
			<InfiniteScroll
				isManual={true}
				hasNextPage={videoList.hasNextPage as boolean}
				isFetchingNextPage={false}
				fetchNextPage={fetchNextVideoPage}
			/>
		</div>
	);
};
