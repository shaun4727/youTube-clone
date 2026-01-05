'use client';

import { InfiniteScroll } from '@/components/infinite-scroll';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';
import { VideoGridCard } from '@/modules/videos/ui/components/video-grid-card';
import { VideoRowCard } from '@/modules/videos/ui/components/video-row-card';
import { SearchedType } from '@/types';
import { useEffect, useState } from 'react';

interface ResultsSectionProps {
	query: string | undefined;
	categoryId: string | undefined;
}

export const ResultsSection = ({ query, categoryId }: ResultsSectionProps) => {
	const [searchedVideo, setSearchedVideo] = useState<SearchedType>({
		resultedVideosWithLimit: [],
		hasNextPage: false,
	});

	// Start at 0 for the first page
	const [offset, setOffset] = useState<number>(0);
	const [loading, setIsLoading] = useState<boolean>(false);

	const isMobile = useIsMobile();

	const getSearchedResultsMethod = async (currentOffset: number, isNewQuery: boolean) => {
		// Use the passed parameter instead of the state variable to avoid lag
		const count = currentOffset * 5;
		setIsLoading(true);

		const res = await fetch(`/api/search-videos?offset=${count}&query=${query}&categoryId=${categoryId ?? ''}`, {
			method: 'GET',
		});
		setIsLoading(false);
		const result = await res.json();

		setSearchedVideo((prev) => {
			if (isNewQuery) return result;
			return {
				resultedVideosWithLimit: [...prev.resultedVideosWithLimit, ...result.resultedVideosWithLimit],
				hasNextPage: result.hasNextPage,
			};
		});
	};

	const fetchNextPage = () => {
		setOffset((prev) => prev + 1);
		getSearchedResultsMethod(offset, false);
	};

	// Triggered whenever the query or category changes
	useEffect(() => {
		// Reset local logic for a fresh search
		setOffset(0);
		setSearchedVideo({ resultedVideosWithLimit: [], hasNextPage: false });

		// Fetch the first page (offset 0)
		getSearchedResultsMethod(0, true);
	}, [query, categoryId]);

	return (
		<>
			{isMobile ? (
				<div className="flex flex-col gap-4 gap-y-10">
					{searchedVideo.resultedVideosWithLimit.map((video) => (
						<VideoGridCard key={video.id} data={video} />
					))}
					{loading && (
						<div className="flex gap-2">
							<Skeleton className="h-20 w-1/3 " data-sidebar="menu-skeleton-text" />
							<div className="flex flex-1 flex-col gap-1">
								<Skeleton className="h-4 w-1/3 " data-sidebar="menu-skeleton-text" />
								<div className="flex gap-2">
									<Skeleton className="h-12 w-12 rounded-full" data-sidebar="menu-skeleton-text" />
									<div className="w-full flex justify-center gap-2 flex-col">
										<Skeleton
											className="h-2 w-1/4 rounded-full"
											data-sidebar="menu-skeleton-text"
										/>
										<Skeleton
											className="h-2 w-1/5 rounded-full"
											data-sidebar="menu-skeleton-text"
										/>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			) : (
				<div className="flex flex-col gap-4">
					{searchedVideo.resultedVideosWithLimit.map((video) => (
						<VideoRowCard key={video.id} data={video} size="compact" />
					))}
					{loading && (
						<div className="flex gap-2">
							<Skeleton className="h-20 w-1/3 " data-sidebar="menu-skeleton-text" />
							<div className="flex flex-1 flex-col gap-1">
								<Skeleton className="h-4 w-1/3 " data-sidebar="menu-skeleton-text" />
								<div className="flex gap-2">
									<Skeleton className="h-12 w-12 rounded-full" data-sidebar="menu-skeleton-text" />
									<div className="w-full flex justify-center gap-2 flex-col">
										<Skeleton
											className="h-2 w-1/4 rounded-full"
											data-sidebar="menu-skeleton-text"
										/>
										<Skeleton
											className="h-2 w-1/5 rounded-full"
											data-sidebar="menu-skeleton-text"
										/>
									</div>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
			{/* Implement infinite scroll */}
			<InfiniteScroll
				isManual={true}
				hasNextPage={searchedVideo?.hasNextPage as boolean}
				isFetchingNextPage={false}
				fetchNextPage={fetchNextPage}
			/>
		</>
	);
};
