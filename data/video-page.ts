import prisma from '@/lib/db';

export const getVideoInfoWithUser = async (id: string, userId: string) => {
	try {
		const videoInfoWithUser = await prisma.video.findUnique({
			where: {
				userId: userId,
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
					},
				},
			},
		});

		return videoInfoWithUser;
	} catch (e) {
		console.log(e);
		return null;
	}
};
