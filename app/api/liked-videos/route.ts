import { getVideosForLikedPage } from '@/data/liked-video';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const offset = searchParams.get('offset');
		const userId = searchParams.get('userId');

		const homeVideos = await getVideosForLikedPage(Number(offset), userId as string);

		return NextResponse.json(homeVideos, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
