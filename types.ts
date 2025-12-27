import { ReactionType, VideoVisibility } from './generated/prisma/enums';

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
	_count: {
		videoViews: number;
	};
	likeCount: number;
	dislikeCount: number;
	viewerReaction: ReactionType;
};

export type User = {
	id?: string | null;
	name?: string | null;
	image?: string | null;
	email?: string | null;
	subscriptions: {
		createdAt: Date;
		updatedAt: Date;
		viewerId: string;
		creatorId: string;
	}[];
};

export interface SingleVideoTypeWithUser extends SingleVideoType {
	user: User | null;
}

export type VideoType = {
	studioVideosWithLimit: SingleVideoType[];
	hasNextPage: boolean;
};

export interface CommentFormProps {
	videoId: string;
	onSuccess?: () => void;
}

export interface CommentDataValue {
	videoId: string;
	id: string;
	userId: string;
	_count: { replies: number };
	value: string;
	user?: User;
	parentId?: string;
	replies: { replies: CommentDataValue[] };
	createdAt?: Date;
	likeCount: number;
	dislikeCount: number;
	commentReaction: { reactionType: ReactionType; userId: string }[];
}

export type ReplyType = {
	videoId: string;
	id: string;
	userId: string;
	value: string;
	user?: User;
	parentId?: string;
	replies: [];
	createdAt?: Date;
	commentReaction: { reactionType: ReactionType; userId: string }[];
};
