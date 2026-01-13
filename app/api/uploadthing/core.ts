import { auth } from '@/auth';
import prisma from '@/lib/db';
import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError, UTApi } from 'uploadthing/server';
import z from 'zod';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	//  banner upload starts -------------------------
	bannerUploader: f({
		image: {
			maxFileSize: '4MB',
			maxFileCount: 1,
		},
	})
		// Set permissions and file types for this FileRoute
		.middleware(async ({ input }) => {
			// This code runs on your server before upload
			const session = await auth();
			const currUser = session?.user;
			/**
			 * this auth() should return a userId, which should match db/logged in userID
			 */

			// If you throw, the user will not be able to upload
			if (!currUser?.id) throw new UploadThingError('Unauthorized');

			// console.log('video id userId ', input.videoId, currUser.id);
			const existingUser = await prisma.user.findUnique({
				where: {
					id: currUser.id,
				},
			});

			if (!existingUser) throw new UploadThingError('User Not found');

			if (existingUser.bannerKey) {
				const utapi = new UTApi();

				await utapi.deleteFiles(existingUser.bannerKey);

				await prisma.user.update({
					where: {
						id: currUser.id,
					},
					data: {
						bannerUrl: '',
						bannerKey: '',
					},
				});
			}

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { ...{ user: { ...currUser } } };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload

			await prisma.user.update({
				where: {
					id: metadata.user.id,
				},
				data: {
					bannerUrl: file.ufsUrl,
					bannerKey: file.key,
				},
			});

			return { uploadedBy: metadata.user.id };
		}),
	//  banner upload ends ---------------------------
	// Define as many FileRoutes as you like, each with a unique routeSlug
	thumbnailUploader: f({
		image: {
			maxFileSize: '4MB',
			maxFileCount: 1,
		},
	})
		.input(
			z.object({
				videoId: z.string().min(1),
			}),
		)
		// Set permissions and file types for this FileRoute
		.middleware(async ({ input }) => {
			// This code runs on your server before upload
			const session = await auth();
			const currUser = session?.user;
			/**
			 * this auth() should return a userId, which should match db/logged in userID
			 */

			// If you throw, the user will not be able to upload
			if (!currUser?.id) throw new UploadThingError('Unauthorized');

			// console.log('video id userId ', input.videoId, currUser.id);
			const existingVideo = await prisma.video.findUnique({
				where: {
					id: input.videoId,
					userId: currUser.id,
				},
				select: {
					id: true,
					name: true,
					muxAssetId: true,
					muxStatus: true,
					thumbnailKey: true,
				},
			});

			if (!existingVideo) throw new UploadThingError('Not found');

			if (existingVideo.thumbnailKey) {
				const utapi = new UTApi();

				await utapi.deleteFiles(existingVideo.thumbnailKey);

				await prisma.video.update({
					where: {
						id: input.videoId,
						userId: currUser.id,
					},
					data: {
						thumbnailUrl: '',
						thumbnailKey: '',
					},
				});
			}

			console.log('upload on create');

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { ...{ user: { ...currUser } }, ...input };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload

			await prisma.video.update({
				where: {
					id: metadata.videoId,
					userId: metadata.user.id,
				},
				data: {
					thumbnailUrl: file.ufsUrl,
					thumbnailKey: file.key,
				},
				select: {
					id: true,
					name: true,
					muxAssetId: true,
					muxStatus: true,
				},
			});

			return { uploadedBy: metadata.user.id };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
