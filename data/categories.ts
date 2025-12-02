import prisma from '@/lib/db';

export const getCategories = async () => {
	try {
		const categoryNames = await prisma.category.findMany({
			select: {
				id: true,
				name: true,
			},
		});
		return categoryNames;
	} catch (e) {
		console.log(e);
		return null;
	}
};
