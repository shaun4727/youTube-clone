import { DEFAULT_LIMIT } from '@/constants';
import prisma from '@/lib/db';

export const getVideoFilesForSuggestionList = async (id: string, offset: number) => {
	try {
		const suggestedVideosWithLimit = await prisma.video.findMany({
			where: {
				id: {
					not: id,
				},
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
			take: DEFAULT_LIMIT + 1,
			skip: offset,
		});

		const hasNextPage = suggestedVideosWithLimit.length > DEFAULT_LIMIT;

		// Slice the array to return only the desired limit (5 documents)
		const suggestedVideos = suggestedVideosWithLimit.slice(0, DEFAULT_LIMIT);

		return {
			suggestedVideos,
			hasNextPage,
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};
