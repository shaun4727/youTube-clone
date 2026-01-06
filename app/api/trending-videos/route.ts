import { getVideosForTrendingPage } from '@/data/trendingVideo';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const offset = searchParams.get('offset');

		const homeVideos = await getVideosForTrendingPage(Number(offset));

		return NextResponse.json(homeVideos, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
