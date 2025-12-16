'use client';

import { cn } from '@/lib/utils';
import { VideoPlayer } from '@/modules/studio/ui/components/video-player';
import { SingleVideoTypeWithUser } from '@/types';
import { VideoBanner } from '../components/video-banner';
import { VideoTopRow } from '../components/video-top-row';

interface VideoSectionProps {
	singleVideo: SingleVideoTypeWithUser;
}

export const VideoPageSection = ({ singleVideo }: VideoSectionProps) => {
	console.log('sss ', singleVideo);

	return (
		<div
			className={cn(
				'aspect-video flex flex-col rounded-xl relative ',
				singleVideo?.muxStatus !== 'ready' && 'rounded-b-none',
			)}
		>
			<VideoPlayer
				autoPlay
				onPlay={() => {}}
				playbackId={singleVideo?.muxPlaybackId}
				thumbnailUrl={singleVideo?.thumbnailUrl}
			/>
			<VideoBanner status={singleVideo?.muxStatus} />
			<VideoTopRow video={singleVideo} />
		</div>
	);
};
