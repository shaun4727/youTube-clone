import { getSingleVideo, restoreThumbnail } from '@/data/videos';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ error: 'Missing video ID' }, { status: 400 });
		}

		const video = await getSingleVideo(id as string);
		return NextResponse.json(video, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}

export async function PATCH(req: Request) {
	try {
		const body = await req.json();
		const video = await getSingleVideo(body.id as string);

		const thumbnailUrl = `https://image.mux.com/${video?.studioVideo?.muxPlaybackId}/thumbnail.jpg`;

		const payload = {
			video: { thumbnailUrl, id: video?.studioVideo?.id, thumbnailKey: video?.studioVideo?.thumbnailKey },
			userId: body.currUser.id,
		};
		await restoreThumbnail(payload);

		return NextResponse.json({}, { status: 200 });
	} catch (err) {
		console.log(err);
		console.error(err);
	}
}
