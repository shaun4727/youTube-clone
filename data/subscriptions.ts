import prisma from '@/lib/db';

export const createSubscriptions = async (subscriptionPayload: { viewerId: string; creatorId: string }) => {
	try {
		const newSubscription = await prisma.subscription.create({
			data: {
				viewerId: subscriptionPayload.viewerId,
				creatorId: subscriptionPayload.creatorId,
			},
		});

		return newSubscription;
	} catch (e) {
		// Log the error for debugging purposes
		console.error('Error creating new video:', e);
		return null;
	}
};

export const checkSubscription = async (creatorId: string, viewerId: string) => {
	const subscription = await prisma.subscription.findUnique({
		where: {
			viewerId_creatorId: {
				viewerId: viewerId,
				creatorId: creatorId,
			},
		},
	});

	return !!subscription; // Returns true or false
};

export const totalSubscription = async (viewerId: string) => {
	return await prisma.subscription.findMany({
		where: { viewerId },
	});
};

export const subscriptionProcessCreation = async (subscriptionPayload: { viewerId: string; creatorId: string }) => {
	try {
		return await prisma.$transaction(async (tx) => {
			// 1. Check if the record already exists
			const existingSubscription = await tx.subscription.findFirst({
				where: {
					viewerId: subscriptionPayload.viewerId,
				},
			});

			// 2. If it exists, delete it (The Toggle Off)

			if (existingSubscription) {
				await tx.subscription.delete({
					where: {
						id: existingSubscription.id,
					},
				});
				return null;
			}

			// 3. If it doesn't exist, create it (The Toggle On)
			return await tx.subscription.create({
				data: {
					viewerId: subscriptionPayload?.viewerId,
					creatorId: subscriptionPayload?.creatorId,
				},
			});
		});
	} catch (error) {
		console.error('Failed to create subscription:', error);
		throw error;
	}
};
