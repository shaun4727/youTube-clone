import prisma from '@/lib/db';

export const getUserByEmail = async (email: string) => {
	try {
		const user = await prisma.user.findUnique({ where: { email } });

		return user;
	} catch (err) {
		return null;
	}
};

export const getUserById = async (id: string) => {
	try {
		const user = await prisma.user.findUnique({ where: { id: id } });

		return user;
	} catch (err) {
		return null;
	}
};

export const getUserDataWithId = async (userId: string) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: {
				id: true,
				name: true,
				email: true,
				emailVerified: true,
				image: true,
				bannerUrl: true,
				bannerKey: true,
				_count: {
					select: {
						videos: true, // Maps to videoCount
						subscribers: true, // Maps to subscriberCount
						following: true,
					},
				},
			},
		});

		return user;
	} catch (err) {
		return null;
	}
};
