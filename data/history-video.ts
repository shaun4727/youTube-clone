import { DEFAULT_LIMIT } from '@/constants';
import prisma from '@/lib/db';

export const getVideosForHistoryPage = async (offset: number = 0, userId: string) => {
	try {
		const historyVideos = await prisma.videoViews.findMany({
			where: {
				// Apply search filter on name or description if query exists
				userId,
			},
			select: {
				videos: {
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
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: DEFAULT_LIMIT + 1,
			skip: offset,
		});

		const allVideos = historyVideos.map((videos) => videos.videos);
		const hasNextPage = allVideos.length > DEFAULT_LIMIT;

		// Slice the array to return only the desired limit (5 documents)
		const historyVideosWithLimit = allVideos.slice(0, DEFAULT_LIMIT);

		return {
			historyVideosWithLimit,
			hasNextPage,
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};
