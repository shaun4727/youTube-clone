import prisma from '@/lib/db';
import { CommentFormProps } from '@/types';

export const updateVideoSchema = async ({ videoId }: CommentFormProps) => {
	try {
		const updatedVideo = await prisma.video.create({
			data: {
				videoId,
			},
		});

		return updatedVideo;
	} catch (err) {
		console.error('Error in updating video schema', err);
		return null;
	}
};
