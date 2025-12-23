import { DEFAULT_LIMIT } from '@/constants';
import prisma from '@/lib/db';
import { CommentDataValue } from '@/types';

export const createCommentSchema = async ({ videoId, userId, value }: CommentDataValue) => {
	try {
		const updatedVideo = await prisma.comments.create({
			data: {
				videoId,
				userId,
				value,
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
			include: {
				user: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: DEFAULT_LIMIT + 1,
			skip: offset,
		});

		const hasNextPage = allComments.length > DEFAULT_LIMIT;

		// Slice the array to return only the desired limit (5 documents)
		const commentsWithLimit = allComments.slice(0, DEFAULT_LIMIT);

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
