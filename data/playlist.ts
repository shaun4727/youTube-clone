import { DEFAULT_LIMIT } from '@/constants';
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
				videos: {
					include: {
						video: true,
					},
				},
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

export const getIndividualPlaylistInfo = async (playlistId: string, offset: number = 0) => {
	try {
		const playlistInfo = await prisma.playlists.findUnique({
			where: {
				id: playlistId, // Optimized: findUnique by Primary Key
			},
			select: {
				id: true,
				name: true,
				videos: {
					// Database-level pagination
					take: DEFAULT_LIMIT + 1,
					skip: offset,
					select: {
						video: {
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
									},
								},
							},
						},
					},
				},
			},
		});

		if (!playlistInfo) return { playlistInfoWithLimit: null, hasNextPage: false };

		// Check if there is a next page by seeing if we got the "+1" record
		const hasNextPage = playlistInfo.videos.length > DEFAULT_LIMIT;

		// Remove the extra record used for the hasNextPage check
		const finalVideos = hasNextPage ? playlistInfo.videos.slice(0, DEFAULT_LIMIT) : playlistInfo.videos;

		return {
			playlistInfoWithLimit: {
				...playlistInfo,
				videos: finalVideos,
			},
			hasNextPage,
		};
	} catch (err) {
		console.error('Error fetching playlist:', err);
		throw err;
	}
};

export const deleteIndividualPlaylistInfo = async (playlistId: string) => {
	try {
		const res = await prisma.playlists.delete({
			where: {
				id: playlistId,
			},
		});
		return res;
	} catch (err) {
		console.log(err);
	}
};
