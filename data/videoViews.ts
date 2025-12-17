import prisma from '@/lib/db';

export const getStudioFiles = async (videoId: string, userId: string) => {
	try {
		const getVideoViews = await prisma.videoViews.findMany({
			where: {
				videoId: videoId,
				userId: userId,
			},
		});

		return getVideoViews;
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const createVideoViews = async (videoData: { userId: string; videoId: string }) => {
	try {
		const newVideo = await prisma.videoViews.create({
			data: {
				videoId: videoData.videoId,
				userId: videoData.userId,
			},
		});

		return newVideo;
	} catch (e) {
		// Log the error for debugging purposes
		console.error('Error creating new video:', e);
		return null;
	}
};
