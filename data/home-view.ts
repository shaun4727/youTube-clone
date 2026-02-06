import { DEFAULT_LIMIT } from '@/constants';
import prisma from '@/lib/db';

export const getVideosForHomePage = async (offset: number = 0, categoryId: string | undefined) => {
	try {
		const homeVideos = await prisma.video.findMany({
			where: {
				// Apply search filter on name or description if query exists
				...(categoryId ? { categoryId } : {}),
			},
			select: {
				id: true,
				name: true,
				description: true,
				categoryId: true,
				thumbnailUrl: true,
				duration: true,
				previewUrl: true,
				muxStatus: true,
				createdAt: true,
				visibility: true,
				muxPlaybackId: true,
				muxTrackStatus: true,
				thumbnailKey: true,
				user: {
					select: {
						id: true,
						name: true,
						email: true,
						image: true,
					},
				},
				_count: {
					select: {
						videoViews: true,
						// We remove reactionType from here because we want a filtered count
					},
				},
			},
			// Order by newest first is usually preferred for studio views
			orderBy: {
				createdAt: 'desc',
			},
			take: DEFAULT_LIMIT + 1,
			skip: offset,
		});

		const hasNextPage = homeVideos?.length > DEFAULT_LIMIT;

		// Slice the array to return only the desired limit (5 documents)
		const homeVideosWithLimit = homeVideos?.slice(0, DEFAULT_LIMIT);

		return {
			homeVideosWithLimit,
			hasNextPage,
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const getVideosForUserVideoPage = async (offset: number = 0, userId: string | undefined) => {
	try {
		const userVideos = await prisma.video.findMany({
			where: {
				// Apply search filter on name or description if query exists
				userId,
			},
			select: {
				id: true,
				name: true,
				description: true,
				categoryId: true,
				thumbnailUrl: true,
				duration: true,
				previewUrl: true,
				muxStatus: true,
				createdAt: true,
				visibility: true,
				muxPlaybackId: true,
				muxTrackStatus: true,
				thumbnailKey: true,
				user: {
					select: {
						id: true,
						name: true,
						email: true,
						image: true,
					},
				},
				_count: {
					select: {
						videoViews: true,
						// We remove reactionType from here because we want a filtered count
					},
				},
			},
			// Order by newest first is usually preferred for studio views
			orderBy: {
				createdAt: 'desc',
			},
			take: DEFAULT_LIMIT + 1,
			skip: offset,
		});

		const hasNextPage = userVideos.length > DEFAULT_LIMIT;

		// Slice the array to return only the desired limit (5 documents)
		const userVideosWithLimit = userVideos.slice(0, DEFAULT_LIMIT);

		return {
			userVideosWithLimit,
			hasNextPage,
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};
