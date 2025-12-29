import { getVideoFilesForSuggestionList } from '@/data/suggestion-list';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ error: 'Missing video ID' }, { status: 400 });
		}

		const suggestionVideos = await getVideoFilesForSuggestionList(id as string);
		return NextResponse.json(suggestionVideos, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
