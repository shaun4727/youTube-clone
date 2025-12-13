import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import z from 'zod';

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	thumbnailUploader: f({
		image: {
			maxFileSize: '4MB',
			maxFileCount: 1,
		},
	})
		.input(
			z.object({
				videoId: z.string().uuid(),
			}),
		)
		// Set permissions and file types for this FileRoute
		.middleware(async ({ input }) => {
			// This code runs on your server before upload
			const userId = await auth();
			/**
			 * this auth() should return a userId, which should match db/logged in userID
			 */

			// If you throw, the user will not be able to upload
			if (!userId) throw new UploadThingError('Unauthorized');

			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId, ...input };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log('Upload complete for userId:', metadata.userId);

			//update videos with thumbnailUrl -> file.url, where video.id, metadata.videoId is equal and
			// videos.userId, metadata.userId is equal

			console.log('file url', file.ufsUrl);

			// !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
			return { uploadedBy: metadata.userId };
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
