import { DEFAULT_LIMIT } from '@/constants';
import prisma from '@/lib/db';

export const getSearchResults = async (offset: number = 0, query?: string, categoryId?: string) => {
	try {
		const resultedVideos = await prisma.video.findMany({
			where: {
				// Apply search filter on name or description if query exists
				...(query
					? {
							OR: [
								{ name: { contains: query, mode: 'insensitive' } },
								{ description: { contains: query, mode: 'insensitive' } },
							],
					  }
					: {}),
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
			},
			// Order by newest first is usually preferred for studio views
			orderBy: {
				createdAt: 'desc',
			},
			take: DEFAULT_LIMIT + 1,
			skip: offset,
		});

		console.log('result ', categoryId);
		const hasNextPage = resultedVideos.length > DEFAULT_LIMIT;
		const resultedVideosWithLimit = resultedVideos.slice(0, DEFAULT_LIMIT);

		return {
			resultedVideosWithLimit,
			hasNextPage,
		};
	} catch (e) {
		console.error('Error fetching studio files:', e);
		return null;
	}
};
