import { DEFAULT_LIMIT } from '@/constants';
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

export const getVideosForSubscriptionPage = async (viewerId: string, offset: number = 0) => {
	try {
		const subscriptionVideos = await prisma.video.findMany({
			where: {
				user: {
					subscribers: {
						some: {
							viewerId: viewerId,
						},
					},
				},
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
						image: true,
					},
				},
				_count: {
					select: {
						videoViews: true,
					},
				},
			},
			// Updated orderBy logic here
			orderBy: {
				videoViews: {
					_count: 'desc', // Use 'desc' for most views, 'asc' for least
				},
			},
			take: DEFAULT_LIMIT + 1,
			skip: offset,
		});

		const hasNextPage = subscriptionVideos.length > DEFAULT_LIMIT;

		// Slice the array to return only the desired limit (5 documents)
		const subscribedVideosWithLimit = subscriptionVideos.slice(0, DEFAULT_LIMIT);

		return {
			subscribedVideosWithLimit,
			hasNextPage,
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};

export const getSubscriptionsList = async (userId: string, offset: number) => {
	const subscriptionList = await prisma.subscription.findMany({
		where: {
			viewerId: userId,
		},
		select: {
			creatorId: true,
			viewerId: true,
			creator: true,
		},
		take: DEFAULT_LIMIT + 1,
		skip: offset,
	});

	const hasNextPage = subscriptionList.length > DEFAULT_LIMIT;
	const subscriptionsListWithLimit = subscriptionList.slice(0, DEFAULT_LIMIT);

	return {
		subscriptionsListWithLimit,
		hasNextPage,
	};
};

export const checkIfUserSubscribed = async (viewerId: string, creatorId: string) => {
	const count = await prisma.subscription.count({
		where: {
			viewerId: viewerId,
			creatorId: creatorId,
		},
	});

	const isSubscribed = count > 0;

	return isSubscribed;
};
