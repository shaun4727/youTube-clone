import { getVideosForUserVideoPage } from '@/data/home-view';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const offset = searchParams.get('offset');
		const userId = searchParams.get('userId');

		const userVideos = await getVideosForUserVideoPage(Number(offset), userId ?? '');

		return NextResponse.json(userVideos, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
