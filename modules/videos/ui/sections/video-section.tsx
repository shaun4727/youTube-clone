'use client';

import { cn } from '@/lib/utils';
import { VideoPlayer } from '@/modules/studio/ui/components/video-player';
import { SingleVideoType } from '@/types';
import { VideoBanner } from '../components/video-banner';

interface VideoSectionProps {
	singleVideo: SingleVideoType;
}

export const VideoPageSection = ({ singleVideo }: VideoSectionProps) => {
	console.log('sss ', singleVideo);

	return (
		<div className={cn('aspect-video bg-black rounded-xl relative', 'waiting' !== 'ready' && 'rounded-b-none')}>
			<VideoPlayer
				autoPlay
				onPlay={() => {}}
				playbackId={singleVideo.muxPlaybackId}
				thumbnailUrl={singleVideo.thumbnailUrl}
			/>
			<p>adfa adssdfa</p>
			<VideoBanner status={'waiting'} />
		</div>
	);
};
