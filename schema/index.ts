import * as z from 'zod';

import { VideoVisibility } from '@prisma/client';

const VideoVisibilityEnum = z.enum([VideoVisibility.PRIVATE, VideoVisibility.PUBLIC]);

export const VideoSchemaZod = z.object({
	name: z.string().min(1, {
		message: 'Name is required',
	}),
	description: z.string().min(1, {
		message: 'Description is required',
	}),
	thumbnailUrl: z
		.string()
		.min(1, {
			message: 'Thumbnail is required',
		})
		.optional(),
	// previewUrl: z
	// 	.string()
	// 	.min(1, {
	// 		message: 'Preview is required',
	// 	})
	// 	.optional(),
	// duration: z.number(),
	categoryId: z.string(),
	// muxStatus: z.string().min(1, 'Mux status must not be empty.'),

	// For 'createdAt', Zod's z.date() handles Date objects.
	// Use z.coerce.date() if the input might be a string or number that needs converting.
	// createdAt: z.date(),

	visibility: VideoVisibilityEnum.default(VideoVisibility.PRIVATE).optional(),
});

export const CommentSchema = z.object({
	value: z.string(),
	parentId: z.string().optional(),
});

export const PlaylistSchema = z.object({
	name: z.string(),
});
