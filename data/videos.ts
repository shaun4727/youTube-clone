import { DEFAULT_LIMIT } from '@/constants';
import prisma from '@/lib/db';

export const getStudioFiles = async (id: string) => {
	try {
		const studioVideos = await prisma.video.findMany({
			where: {
				userId: id,
			},
			select: {
				id: true,
				name: true,
				description: true,
			},
			take: DEFAULT_LIMIT + 1,
		});

		const hasNextPage = studioVideos.length > DEFAULT_LIMIT;

		// Slice the array to return only the desired limit (5 documents)
		const studioVideosWithLimit = studioVideos.slice(0, DEFAULT_LIMIT);

		return {
			studioVideosWithLimit,
			hasNextPage,
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};

/**
 * Inserts a new video record into the database.
 * @param videoData The data required for the new video.
 * @returns The newly created video object, or null on error.
 */
export const createStudioVideo = async (videoData: {
	name: string;
	description: string;
	userId: string;
	categoryId?: string; // Optional field
}) => {
	try {
		const newVideo = await prisma.video.create({
			data: {
				name: videoData.name,
				description: videoData.description,
				userId: videoData.userId,
				// Only include categoryId if it's provided
				...(videoData.categoryId && { categoryId: videoData.categoryId }),
			},
			// Optionally, you can select which fields to return
			select: {
				id: true,
				name: true,
				createdAt: true,
			},
		});

		// The 'newVideo' object will contain the created data, including the auto-generated 'id' and 'createdAt'.
		return newVideo;
	} catch (e) {
		// Log the error for debugging purposes
		console.error('Error creating new video:', e);
		return null;
	}
};
