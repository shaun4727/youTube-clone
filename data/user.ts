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
