import { SingleVideoTypeWithUser } from '@/types';
import { VideoGridCard } from '../components/video-grid-card';
import { VideoRowCard } from '../components/video-row-card';

export const SuggestionsSection = async ({ videoId }: { videoId: string }) => {
	const resp = await fetch(`${process.env.CLIENT_ADDRESS}/api/suggestion-section?id=${videoId}`, {
		method: 'GET',
		cache: 'no-store',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const suggestions = await resp.json();

	return (
		<>
			<div className="hidden md:block space-y-3">
				{suggestions?.suggestedVideos?.map((video: SingleVideoTypeWithUser) => (
					<VideoRowCard key={video.id} data={video} size="compact" />
				))}
			</div>
			<div className="block md:hidden space-y-10">
				{suggestions?.suggestedVideos?.map((video: SingleVideoTypeWithUser) => (
					<VideoGridCard key={video.id} data={video} />
				))}
			</div>

			{/* Implement infinite scroll */}
		</>
	);
};
