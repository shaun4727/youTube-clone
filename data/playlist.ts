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
