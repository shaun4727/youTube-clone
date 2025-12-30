'use client';
import { InfiniteScroll } from '@/components/infinite-scroll';
import { SingleVideoTypeWithUser } from '@/types';
import { useEffect, useState } from 'react';
import { VideoGridCard } from '../components/video-grid-card';
import { VideoRowCard } from '../components/video-row-card';

export const SuggestionsSection = ({ videoId }: { videoId: string }) => {
	const [offset, setOffset] = useState<number>(0);
	const [allSuggestions, setAllSuggestions] = useState<{
		suggestedVideos: SingleVideoTypeWithUser[];
		hasNextPage: Boolean;
	}>({
		suggestedVideos: [],
		hasNextPage: false,
	});

	const getAllSuggestions = async () => {
		try {
			const resp = await fetch(`/api/suggestion-section?id=${videoId}&offset=${offset}`, {
				method: 'GET',
				cache: 'no-store',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const suggestions = await resp.json();

			setOffset((prev) => prev + 5);

			setAllSuggestions(suggestions);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAllSuggestions();
	}, []);

	return (
		<>
			<div className="hidden md:block space-y-3">
				{allSuggestions?.suggestedVideos?.map((video: SingleVideoTypeWithUser) => (
					<VideoRowCard key={video.id} data={video} size="compact" />
				))}
			</div>
			<div className="block md:hidden space-y-10">
				{allSuggestions?.suggestedVideos?.map((video: SingleVideoTypeWithUser) => (
					<VideoGridCard key={video.id} data={video} />
				))}
			</div>

			{/* Implement infinite scroll */}
			<InfiniteScroll
				isManual={true}
				hasNextPage={allSuggestions?.hasNextPage as boolean}
				isFetchingNextPage={false}
				fetchNextPage={getAllSuggestions}
			/>
		</>
	);
};
