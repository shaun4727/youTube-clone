import { insertVideoReaction } from '@/data/video-page';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const newVideo = await insertVideoReaction(body);

		return NextResponse.json(newVideo, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: 'Failed to create video views' }, { status: 500 });
	}
}
