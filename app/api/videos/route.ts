import { createStudioVideo, getStudioFiles } from '@/data/videos'; // where your prisma logic is
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const newVideo = await createStudioVideo(body);

		return NextResponse.json(newVideo, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
	}
}

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id');

		if (!id) {
			return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
		}

		const files = await getStudioFiles(id as string);
		return NextResponse.json(files, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
