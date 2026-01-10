'use client';

import { InfiniteScroll } from '@/components/infinite-scroll';
import { Skeleton } from '@/components/ui/skeleton';
import { VideoGridCard } from '@/modules/videos/ui/components/video-grid-card';
import { VideoRowCard } from '@/modules/videos/ui/components/video-row-card';
import { individualPlaylist } from '@/types';
import { useState } from 'react';

interface VideosSectionProps {
	playlistInfo: individualPlaylist;
	getIndividualPlaylistInfo: (offset: number) => void;
	isLoading: boolean;
}

export const VideosSection = ({ playlistInfo, getIndividualPlaylistInfo, isLoading }: VideosSectionProps) => {
	const [offset, setOffset] = useState(1);
	const fetchNextVideoPage = () => {
		setOffset((prev) => prev + 1);

		getIndividualPlaylistInfo(offset * 5);
	};

	return (
		<>
			{!isLoading ? (
				<>
					<div className="flex flex-col gap-4 gap-y-10 md:hidden">
						{playlistInfo.playlistInfoWithLimit.videos.map((video) => (
							<VideoGridCard key={video.video.id} data={video.video} />
						))}
					</div>
					<div className="hidden flex-col gap-4 md:flex">
						{playlistInfo.playlistInfoWithLimit.videos.map((video) => (
							<VideoRowCard key={video.video.id} data={video.video} size="compact" />
						))}
					</div>
					<InfiniteScroll
						isManual={true}
						hasNextPage={playlistInfo.hasNextPage as boolean}
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
