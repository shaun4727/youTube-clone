import { VideoVisibility } from './generated/prisma/enums';

export type VideoType = {
	studioVideosWithLimit: {
		id: string;
		name: string;
		description: string;
		thumbnailUrl: string;
		previewUrl: string;
		duration: number;
		muxStatus: string;
		createdAt: Date;
		visibility: VideoVisibility;
	}[];
	hasNextPage: boolean;
};
