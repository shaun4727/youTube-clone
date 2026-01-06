'use client';

import { InfiniteScroll } from '@/components/infinite-scroll';
import { useAuthUI } from '@/context/user-context';
import { VideoGridCard } from '@/modules/videos/ui/components/video-grid-card';
import { SubscribedVideoType } from '@/types';
import { useEffect, useState } from 'react';

export const SubscriptionVideosSection = () => {
	const [offset, setOffset] = useState(0);
	const { userInfo: user } = useAuthUI();
	const [videoList, setVideoList] = useState<SubscribedVideoType>({
		subscribedVideosWithLimit: [],
		hasNextPage: false,
	});

	const getSubscriptionVideoList = async (currentOffset = 0, initialLoad = true) => {
		const count = currentOffset * 5;
		const res = await fetch(`/api/subscribed-videos?offset=${count}&viewerId=${user?.id}`, {
			method: 'GET',
		});

		const response = await res.json();

		setVideoList((prev) => {
			if (initialLoad) return response;

			return {
				trendingVideosWithLimit: [...prev.subscribedVideosWithLimit, ...response.subscribedVideosWithLimit],
				hasNextPage: response.hasNextPage,
			};
		});
	};

	const fetchNextVideoPage = () => {
		setOffset((prev) => prev + 1);

		getSubscriptionVideoList(offset, false);
	};

	useEffect(() => {
		getSubscriptionVideoList();
	}, []);

	return (
		<div>
			<div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
				{videoList.subscribedVideosWithLimit.map((video) => (
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
