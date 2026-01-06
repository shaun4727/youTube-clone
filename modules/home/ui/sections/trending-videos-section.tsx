'use client';

import { InfiniteScroll } from '@/components/infinite-scroll';
import { VideoGridCard } from '@/modules/videos/ui/components/video-grid-card';
import { TrendingVideoType } from '@/types';
import { useEffect, useState } from 'react';

export const TrendingVideosSection = () => {
	const [offset, setOffset] = useState(0);
	const [videoList, setVideoList] = useState<TrendingVideoType>({
		trendingVideosWithLimit: [],
		hasNextPage: false,
	});

	const getTrendingVideoList = async (currentOffset = 0, initialLoad = true) => {
		const count = currentOffset * 5;
		const res = await fetch(`/api/trending-videos?offset=${count}`, {
			method: 'GET',
		});

		const response = await res.json();

		setVideoList((prev) => {
			if (initialLoad) return response;

			return {
				trendingVideosWithLimit: [...prev.trendingVideosWithLimit, ...response.trendingVideoWithLimit],
				hasNextPage: response.hasNextPage,
			};
		});
	};

	const fetchNextVideoPage = () => {
		setOffset((prev) => prev + 1);

		getTrendingVideoList(offset, false);
	};

	useEffect(() => {
		getTrendingVideoList();
	}, []);

	return (
		<div>
			<div className="gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
				{videoList.trendingVideosWithLimit.map((video) => (
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
