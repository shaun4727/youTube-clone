import { getCommentReplies } from '@/data/comments';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const offset = searchParams.get('offset');
		const parentId = searchParams.get('parentId');
		const comments = await getCommentReplies(parentId as string, Number(offset));

		return NextResponse.json(comments, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
	}
}
