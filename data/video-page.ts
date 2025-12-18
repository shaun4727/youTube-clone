import { ReactionType } from '@/generated/prisma/enums';
import prisma from '@/lib/db';

// export const getVideoInfoWithUser = async (id: string, userId: string) => {
// 	try {
// 		const videoInfoWithUser = await prisma.video.findUnique({
// 			where: {
// 				id: id,
// 			},
// 			select: {
// 				id: true,
// 				name: true,
// 				description: true,
// 				categoryId: true,
// 				thumbnailUrl: true,
// 				duration: true,
// 				previewUrl: true,
// 				muxStatus: true,
// 				createdAt: true,
// 				visibility: true,
// 				muxPlaybackId: true,
// 				muxTrackStatus: true,
// 				thumbnailKey: true,
// 				user: {
// 					select: {
// 						id: true,
// 						name: true,
// 						email: true,
// 						image: true,
// 					},
// 				},
// 				_count: {
// 					select: {
// 						videoViews: true,
// 						reactionType: true,
// 					},
// 				},
// 			},
// 		});

// 		return videoInfoWithUser;
// 	} catch (e) {
// 		console.log(e);
// 		return null;
// 	}
// };

export const getVideoInfoWithUser = async (id: string, userId: string) => {
	try {
		const videoInfoWithUser = await prisma.video.findUnique({
			where: {
				id: id,
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

		if (!videoInfoWithUser) return null;

		// Fetch the "Like" count separately using the specific condition
		const likeCount = await prisma.videoReactions.count({
			where: {
				videoId: id,
				reactionType: 'like', // Ensure this matches your ReactionType Enum casing
			},
		});

		// Fetch the "Dislike" count if needed
		const dislikeCount = await prisma.videoReactions.count({
			where: {
				videoId: id,
				reactionType: 'dislike',
			},
		});

		const userReaction = await prisma.videoReactions.findFirst({
			where: {
				videoId: id,
				userId: userId, // The ID of the person viewing the page
			},
			select: {
				reactionType: true,
			},
		});

		return {
			...videoInfoWithUser,
			likeCount,
			dislikeCount,
			viewerReaction: userReaction?.reactionType || null,
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const insertVideoReaction = async (reactionPayload: { videoId: string; userId: string; type: ReactionType }) => {
	try {
		return await prisma.$transaction(async (tx) => {
			// 1. Check if the record already exists
			const existingReaction = await tx.videoReactions.findFirst({
				where: {
					videoId: reactionPayload.videoId,
					userId: reactionPayload.userId,
				},
			});

			// 2. If it exists, delete it (The Toggle Off)

			if (existingReaction && existingReaction.reactionType === reactionPayload.type) {
				return await tx.videoReactions.delete({
					where: {
						id: existingReaction.id,
					},
				});
			}

			if (existingReaction && existingReaction.reactionType !== reactionPayload.type) {
				await tx.videoReactions.delete({
					where: {
						id: existingReaction.id,
					},
				});
			}

			// 3. If it doesn't exist, create it (The Toggle On)
			return await tx.videoReactions.create({
				data: {
					videoId: reactionPayload.videoId,
					userId: reactionPayload.userId,
					reactionType: reactionPayload.type,
				},
			});
		});
	} catch (error) {
		console.error('Failed to toggle reaction:', error);
		throw error;
	}
};
