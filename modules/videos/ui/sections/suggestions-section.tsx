import { SingleVideoTypeWithUser } from '@/types';
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
		<div>
			{suggestions?.suggestedVideos?.map((video: SingleVideoTypeWithUser) => (
				<VideoRowCard key />
			))}
		</div>
	);
};
