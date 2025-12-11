import { VideoVisibility } from './generated/prisma/enums';

export type SingleVideoType = {
	id: string;
	name: string;
	description: string;
	thumbnailUrl: string;
	previewUrl: string;
	duration: number;
	muxStatus: string;
	createdAt: Date;
	visibility: VideoVisibility;
};

export type VideoType = {
	studioVideosWithLimit: SingleVideoType[];
	hasNextPage: boolean;
};
