import { DEFAULT_LIMIT } from '@/constants';
import prisma from '@/lib/db';
import { CommentDataValue } from '@/types';
import { ReactionType } from './../generated/prisma/enums';

export const createCommentSchema = async ({ videoId, userId, value, parentId }: CommentDataValue) => {
	try {
		const updatedVideo = await prisma.comments.create({
			data: {
				videoId,
				userId,
				value,
				parentId,
			},
		});

		return updatedVideo;
	} catch (err) {
		console.error('Error in updating video schema', err);
		return null;
	}
};

export const getComments = async (offset: number) => {
	try {
		const allComments = await prisma.comments.findMany({
			where: {
				parentId: null,
			},
			include: {
				user: true,
				commentReaction: {
					select: {
						reactionType: true,
						userId: true,
					},
				},
				// replies: {
				// 	include: {
				// 		user: true,
				// 		commentReaction: true,
				// 	},
				// },
				_count: {
					select: { replies: true },
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: DEFAULT_LIMIT + 1,
			skip: offset,
		});

		const hasNextPage = allComments.length > DEFAULT_LIMIT;

		// Slice the array to return only the desired limit (5 documents)
		const rawComments = allComments.slice(0, DEFAULT_LIMIT);

		const commentsWithLimit = rawComments.map((comment) => {
			const likes = comment.commentReaction.filter((c) => c.reactionType === 'like');
			const dislikes = comment.commentReaction.filter((c) => c.reactionType === 'dislike');
			const userIds = comment.commentReaction.map((c) => c.userId);
			return {
				...comment,
				likeCount: likes.length,
				dislikeCount: dislikes.length,
				userIds,
			};
		});

		return {
			commentsWithLimit,
			hasNextPage,
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const deleteSingleComment = async (id: string) => {
	try {
		const deletedComment = await prisma.comments.delete({
			where: {
				id: id,
			},
		});

		return deletedComment;
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const createCommentReactionSchema = async (body: {
	userId: string;
	commentId: string;
	reactionType: ReactionType;
}) => {
	try {
		return await prisma.$transaction(async (tx) => {
			const existingReaction = await tx.commentReactions.findFirst({
				where: {
					commentId: body.commentId,
					userId: body.userId,
				},
			});

			if (existingReaction && existingReaction.reactionType === body.reactionType) {
				return await tx.commentReactions.delete({
					where: {
						id: existingReaction.id,
					},
				});
			}

			if (existingReaction && existingReaction.reactionType !== body.reactionType) {
				await tx.commentReactions.delete({
					where: {
						id: existingReaction.id,
					},
				});
			}

			await prisma.commentReactions.create({
				data: body,
			});
		});
	} catch (err) {
		console.log(err);
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

export const getCommentReplies = async (parentId: string, offset: number = 0) => {
	try {
		const replies = await prisma.comments.findMany({
			where: {
				parentId: parentId,
			},
			include: {
				user: true,
				commentReaction: {
					select: {
						reactionType: true,
						userId: true,
					},
				},
				// Optional: include count of further nested replies if allowing deep threads
				_count: {
					select: { replies: true },
				},
			},
			orderBy: {
				createdAt: 'asc', // Replies usually flow oldest to newest
			},
			take: DEFAULT_LIMIT + 1,
			skip: offset,
		});

		const hasNextPage = replies.length > DEFAULT_LIMIT;
		const rawReplies = replies.slice(0, DEFAULT_LIMIT);

		const formattedReplies = rawReplies.map((reply) => {
			const likes = reply.commentReaction.filter((r) => r.reactionType === 'like');
			const dislikes = reply.commentReaction.filter((r) => r.reactionType === 'dislike');

			return {
				...reply,
				likeCount: likes.length,
				dislikeCount: dislikes.length,
				replyCount: reply._count.replies,
			};
		});

		return {
			replies: formattedReplies,
			hasNextPage,
		};
	} catch (e) {
		console.error('Error fetching replies:', e);
		return null;
	}
};
