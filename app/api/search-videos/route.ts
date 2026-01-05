import { getSearchResults } from '@/data/search-queries';
import { NextResponse } from 'next/server';
export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const offset = searchParams.get('offset');
		const query = searchParams.get('query');
		const categoryId = searchParams.get('categoryId');

		const video = await getSearchResults(Number(offset), query as string, categoryId as string);
		return NextResponse.json(video, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
