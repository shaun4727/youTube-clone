import { DEFAULT_LIMIT } from '@/constants';
import prisma from '@/lib/db';

export const getVideosForTrendingPage = async (offset: number = 0) => {
	try {
		const trendingVideos = await prisma.video.findMany({
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
					},
				},
			},
			// Updated orderBy logic here
			orderBy: {
				videoViews: {
					_count: 'desc', // Use 'desc' for most views, 'asc' for least
				},
			},
			take: DEFAULT_LIMIT + 1,
			skip: offset,
		});

		const hasNextPage = trendingVideos.length > DEFAULT_LIMIT;

		// Slice the array to return only the desired limit (5 documents)
		const trendingVideosWithLimit = trendingVideos.slice(0, DEFAULT_LIMIT);

		return {
			trendingVideosWithLimit,
			hasNextPage,
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};
