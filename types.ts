import { ReactionType } from '@/generated/prisma/enums';
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
	_count: {
		videoViews: number;
		ReactionType: number;
		VideoCommented: number;
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
	bannerUrl?: string | null;
	bannerKey?: string | null;
	subscriptions: {
		createdAt: Date;
		updatedAt: Date;
		viewerId: string;
		creatorId: string;
	}[];
	_count: {
		videos: number;
		subscribers: number;
		following: number;
	};
};

export interface SingleVideoTypeWithUser extends SingleVideoType {
	user: User | null;
}

export type VideoType = {
	studioVideosWithLimit: SingleVideoType[];
	hasNextPage: boolean;
};
export type SearchedType = {
	resultedVideosWithLimit: SingleVideoTypeWithUser[];
	hasNextPage: boolean;
};

export type HomeVideoType = {
	homeVideosWithLimit: SingleVideoTypeWithUser[];
	hasNextPage: boolean;
};
export type UserVideoType = {
	userVideosWithLimit: SingleVideoTypeWithUser[];
	hasNextPage: boolean;
};
export type TrendingVideoType = {
	trendingVideosWithLimit: SingleVideoTypeWithUser[];
	hasNextPage: boolean;
};
export type SubscribedVideoType = {
	subscribedVideosWithLimit: SingleVideoTypeWithUser[];
	hasNextPage: boolean;
};
export type HistoryVideoType = {
	historyVideosWithLimit: SingleVideoTypeWithUser[];
	hasNextPage: boolean;
};

export type PlayListsDataType = {
	playlistsWithLimit: SingleVideoTypeWithUser[];
	hasNextPage: boolean;
};

type playlistVideos = {
	playlistId: string;
	videoId: string;
	existsInthePlaylist?: boolean;
	video: {
		thumbnailUrl: string;
	};
};

export type Playlists = {
	id: string;
	name: string;
	description: string;
	userId: string;
	videoCount: number;
	videos: playlistVideos[];
};
export type LikedVideoType = {
	likedVideosWithLimit: SingleVideoTypeWithUser[];
	hasNextPage: boolean;
};

export type individualPlaylist = {
	playlistInfoWithLimit: {
		name: string;
		id?: string;
		videos: { video: SingleVideoTypeWithUser }[];
	};
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
	replies: CommentDataValue[];
	createdAt?: Date;
	likeCount: number;
	dislikeCount: number;
	commentReaction: { reactionType: ReactionType; userId: string }[];
}
