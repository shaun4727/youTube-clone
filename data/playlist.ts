import prisma from '@/lib/db';

export const createPlaylistMethod = async ({ userId, name }: { userId: string; name: string }) => {
	try {
		await prisma.playlists.create({
			data: {
				userId,
				name,
				description: '',
			},
		});

		return '';
	} catch (err) {
		console.error('Error in updating video schema', err);
		return null;
	}
};

export const getPlaylistMethod = async (userId: string) => {
	try {
		const playlistItems = await prisma.playlists.findMany({
			where: {
				userId,
			},
			include: {
				// This matches the field name in your Playlists model
				videos: true,
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return playlistItems;
	} catch (err) {
		console.error('Error fetching playlists with videos:', err);
		return null;
	}
};

export const insertIntoPlaylistMethod = async ({ videoId, playlistId }: { videoId: string; playlistId: string }) => {
	try {
		// 1. Check if the video is already in this specific playlist
		const existingEntry = await prisma.playlistVideos.findFirst({
			where: {
				videoId: videoId,
				playlistId: playlistId,
			},
		});

		if (existingEntry) {
			// 2. If it exists, delete the connection (remove from playlist)
			await prisma.playlistVideos.delete({
				where: {
					id: existingEntry.id,
				},
			});
			return { action: 'removed', data: null };
		} else {
			// 3. If it doesn't exist, create the new row
			const newEntry = await prisma.playlistVideos.create({
				data: {
					videoId,
					playlistId,
				},
			});
			return { action: 'added', data: newEntry };
		}
	} catch (err) {
		console.error('Error in toggling playlist video:', err);
		return null;
	}
};
