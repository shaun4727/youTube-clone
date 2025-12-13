import {
	createStudioVideo,
	deleteSingleVideoSchemaOnReady,
	getStudioFiles,
	updateSingleVideoSchemaOnReady,
} from '@/data/videos'; // where your prisma logic is
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const newVideo = await createStudioVideo(body);

		return NextResponse.json(newVideo, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
	}
}

export async function PATCH(req: Request) {
	try {
		const body = await req.json();

		const resBody = await updateSingleVideoSchemaOnReady({
			whereField: { key: 'id', value: body.videoId },
			data: {
				name: body.name,
				description: body.description,
				categoryId: body.category_id,
				userId: body.userId,
				visibility: body.visibility,
			},
			selectFields: {
				id: true,
				name: true,
				description: true,
				categoryId: true,
				muxAssetId: true,
				muxStatus: true,
				muxTrackStatus: true,
			},
		});

		return NextResponse.json(resBody, { status: 200 });
	} catch (err) {
		console.log(err);
		console.error(err);
	}
}

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');
		const offset = searchParams.get('offset');

		if (!id) {
			return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
		}

		const files = await getStudioFiles(id as string, Number(offset));
		return NextResponse.json(files, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}

export async function DELETE(req: Request) {
	try {
		const body = await req.json();

		if (!body.id || !body.userId) {
			return NextResponse.json(
				{
					message: 'Missing required fields: id and userId',
				},
				{ status: 400 },
			);
		}

		const resBody = await deleteSingleVideoSchemaOnReady({
			whereFields: [
				{ key: 'id', value: body.id },
				{ key: 'userId', value: body.userId },
			],
			selectFields: {
				id: true,
			},
		});

		if (resBody && resBody.id) {
			return NextResponse.json(resBody, { status: 200 });
		} else {
			return NextResponse.json(
				{
					message: 'Video not found or deletion failed',
				},
				{ status: 404 },
			);
		}
	} catch (err) {
		return NextResponse.json({ error: 'Failed to delete videos' }, { status: 500 });
	}
}
