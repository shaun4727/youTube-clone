import prisma from '@/lib/db';

export const getVideoFilesForSuggestionList = async (id: string) => {
	try {
		const suggestedVideos = await prisma.video.findMany({
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
		});

		return {
			suggestedVideos,
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};
