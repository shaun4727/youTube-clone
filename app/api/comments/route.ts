import { createCommentSchema, getComments } from '@/data/comments';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const newComment = await createCommentSchema(body);

		return NextResponse.json(newComment, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
	}
}

export async function GET(req: Request) {
	try {
		const comments = await getComments();

		return NextResponse.json(comments, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
	}
}
