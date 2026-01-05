import { getVideosForHomePage } from '@/data/home-view';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const offset = searchParams.get('offset');
		const categoryId = searchParams.get('categoryId');

		const homeVideos = await getVideosForHomePage(Number(offset), categoryId ?? '');

		return NextResponse.json(homeVideos, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
