'use client';

import { SingleVideoType } from '@/types';

interface VideoSectionProps {
	singleVideo: SingleVideoType;
}

export const VideoPageSection = ({ singleVideo }: VideoSectionProps) => {
	return <div>Video are: {JSON.stringify(singleVideo)}</div>;
};
