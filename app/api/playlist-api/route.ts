import { createPlaylistMethod } from '@/data/playlist';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const newPlaylist = await createPlaylistMethod(body);

		return NextResponse.json(newPlaylist, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
	}
}
