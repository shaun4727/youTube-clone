import { DEFAULT_LIMIT } from '@/constants';
import { Prisma } from '@/generated/prisma/client';
import prisma from '@/lib/db';
import { mux } from '@/lib/mux';

export const getStudioFiles = async (id: string, offset: number = 0) => {
	try {
		const studioVideos = await prisma.video.findMany({
			where: {
				userId: id,
			},
			select: {
				id: true,
				name: true,
				description: true,
				thumbnailUrl: true,
				duration: true,
				previewUrl: true,
				muxStatus: true,
				createdAt: true,
			},
			take: DEFAULT_LIMIT + 1,
			skip: offset,
		});

		const hasNextPage = studioVideos.length > DEFAULT_LIMIT;

		// Slice the array to return only the desired limit (5 documents)
		const studioVideosWithLimit = studioVideos.slice(0, DEFAULT_LIMIT);

		return {
			studioVideosWithLimit,
			hasNextPage,
		};
	} catch (e) {
		console.log(e);
		return null;
	}
};

/**
 * Inserts a new video record into the database.
 * @param videoData The data required for the new video.
 * @returns The newly created video object, or null on error.
 */
export const createStudioVideo = async (videoData: {
	name: string;
	description: string;
	userId: string;
	muxStatus: string;
	muxUploadId: string;
	categoryId?: string; // Optional field
}) => {
	try {
		const upload = await mux.video.uploads.create({
			new_asset_settings: {
				passthrough: videoData.userId,
				playback_policy: ['public'],
				input: [
					{
						generated_subtitles: [
							{
								language_code: 'en',
								name: 'English',
							},
						],
					},
				],
			},
			cors_origin: '*',
		});

		const newVideo = await prisma.video.create({
			data: {
				name: videoData.name,
				description: videoData.description,
				userId: videoData.userId,
				muxStatus: 'pending',
				muxUploadId: upload.id,
				// Only include categoryId if it's provided
				...(videoData.categoryId && { categoryId: String(videoData.categoryId) ?? undefined }),
			},
			// Optionally, you can select which fields to return
			select: {
				id: true,
				name: true,
				createdAt: true,
			},
		});

		// The 'newVideo' object will contain the created data, including the auto-generated 'id' and 'createdAt'.
		return { video: newVideo, url: upload.url };
	} catch (e) {
		// Log the error for debugging purposes
		console.error('Error creating new video:', e);
		return null;
	}
};

export const updateVideoSchema = async (videoIdToUpdate: string, newMuxAssetId: string, muxStatus: string) => {
	try {
		const updatedVideo = await prisma.video.update({
			where: {
				muxUploadId: videoIdToUpdate,
			},
			data: {
				muxAssetId: newMuxAssetId,
				muxStatus: muxStatus,
			},
			select: {
				id: true,
				name: true,
				muxAssetId: true,
				muxStatus: true,
			},
		});

		return updatedVideo;
	} catch (err) {
		console.error('Error in updating video schema', err);
		return null;
	}
};

// Define the type for the unique field key,
// based on how you defined 'VideoUniqueField' in the original code.
// For standard Prisma, this is typically keys like 'id', 'slug', etc.
// For this example, we'll assume it's one of the unique fields on the Video model.
type VideoUniqueField = keyof Prisma.VideoWhereUniqueInput;

export const updateVideoSchemaOnReady = async ({
	whereField,
	data,
	selectFields,
}: {
	whereField: { key: VideoUniqueField; value: any };
	data: Prisma.VideoUpdateInput;
	selectFields?: Prisma.VideoSelect;
}) => {
	try {
		// Build dynamic where object
		const where: Prisma.VideoWhereUniqueInput = {
			[whereField.key]: whereField.value,
		} as Prisma.VideoWhereUniqueInput;

		const updatedVideo = await prisma.video.update({
			where,
			data,
			select: selectFields,
		});

		return updatedVideo;
	} catch (err) {
		console.log(err);
		throw err;
	}
};

export const deleteVideoSchemaOnReady = async ({
	whereField,
	selectFields,
}: {
	// We only need the field to uniquely identify the record to delete.
	whereField: { key: VideoUniqueField; value: any };

	// Select fields are optional to return the deleted record.
	selectFields?: Prisma.VideoSelect;
}) => {
	try {
		// Build dynamic where object to uniquely identify the record
		const where: Prisma.VideoWhereUniqueInput = {
			[whereField.key]: whereField.value,
		} as Prisma.VideoWhereUniqueInput;

		// The key change: Using prisma.video.delete()
		// The 'data' parameter is removed.
		const deletedVideo = await prisma.video.delete({
			where,
			select: selectFields,
		});

		// The deleted record is returned
		return deletedVideo;
	} catch (err) {
		// Handle errors, particularly P2025 (Record to delete does not exist)
		console.error('Error deleting video:', err);
		throw err;
	}
};
