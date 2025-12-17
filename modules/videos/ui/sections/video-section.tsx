'use client';

import { useAuthUI } from '@/context/user-context';
import { cn } from '@/lib/utils';
import { VideoPlayer } from '@/modules/studio/ui/components/video-player';
import { SingleVideoTypeWithUser } from '@/types';
import { useRouter } from 'next/navigation';
import { VideoBanner } from '../components/video-banner';
import { VideoTopRow } from '../components/video-top-row';

interface VideoSectionProps {
	singleVideo: SingleVideoTypeWithUser;
}

export const VideoPageSection = ({ singleVideo }: VideoSectionProps) => {
	const { userInfo } = useAuthUI();
	const router = useRouter();

	const onVideoPlayUpdateVideoViewTable = async () => {
		try {
			const formPayload = {
				userId: userInfo?.id,
				videoId: singleVideo.id,
			};

			await fetch('/api/video-page', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formPayload),
			});
		} catch (err) {
			console.log(err);
		}
	};

	const handlePlay = async () => {
		if (!userInfo) {
			return;
		}

		await onVideoPlayUpdateVideoViewTable();
		router.refresh();
	};

	return (
		<div
			className={cn(
				'aspect-video flex flex-col rounded-xl relative ',
				singleVideo?.muxStatus !== 'ready' && 'rounded-b-none',
			)}
		>
			<VideoPlayer
				autoPlay
				onPlay={handlePlay}
				playbackId={singleVideo?.muxPlaybackId}
				thumbnailUrl={singleVideo?.thumbnailUrl}
			/>
			<VideoBanner status={singleVideo?.muxStatus} />
			<VideoTopRow video={singleVideo} />
		</div>
	);
};
