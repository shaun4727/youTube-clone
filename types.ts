import { VideoVisibility } from './generated/prisma/enums';

export type SingleVideoType = {
	id: string;
	name: string;
	description: string;
	thumbnailUrl?: string;
	previewUrl?: string;
	duration: number;
	muxStatus: string;
	createdAt: Date;
	visibility: VideoVisibility;
	categoryId: string;
	muxPlaybackId: string;
	muxTrackStatus: string;
};

export type User = {
	id?: string | null;
	name?: string | null;
	image?: string | null;
	email?: string | null;
};

export interface SingleVideoTypeWithUser extends SingleVideoType {
	user: User | null;
}

export type VideoType = {
	studioVideosWithLimit: SingleVideoType[];
	hasNextPage: boolean;
};
