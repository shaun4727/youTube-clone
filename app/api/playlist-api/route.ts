import { createPlaylistMethod, getPlaylistMethod } from '@/data/playlist';
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

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get('userId');

		const playlists = await getPlaylistMethod(userId as string);
		return NextResponse.json(playlists, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
