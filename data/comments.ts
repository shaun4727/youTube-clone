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

export const getComments = async () => {
	try {
		const allComments = await prisma.comments.findMany({
			include: {
				user: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return {
			allComments,
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};
