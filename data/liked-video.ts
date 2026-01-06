import { DEFAULT_LIMIT } from '@/constants';
import prisma from '@/lib/db';

export const getVideosForLikedPage = async (offset: number = 0, userId: string) => {
	try {
		const reactions = await prisma.videoReactions.findMany({
			where: {
				userId,
				reactionType: 'like', // Ensure this matches your Enum case
			},
			select: {
				videos: {
					// This pulls the related video data
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

		// Map the results to extract the video object
		const allVideos = reactions.map((r) => r.videos).filter((v): v is NonNullable<typeof v> => v !== null);

		const hasNextPage = allVideos.length > DEFAULT_LIMIT;
		const likedVideosWithLimit = allVideos.slice(0, DEFAULT_LIMIT);

		return {
			likedVideosWithLimit,
			hasNextPage,
		};
	} catch (e) {
		console.error('Error fetching liked videos:', e);
		return null;
	}
};
