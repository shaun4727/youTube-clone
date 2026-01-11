import { deleteIndividualPlaylistInfo, getIndividualPlaylistInfo } from '@/data/playlist';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const playlistId = searchParams.get('playlistId');

		const playlistInfo = await getIndividualPlaylistInfo(playlistId as string);
		return NextResponse.json(playlistInfo, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}

export async function DELETE(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const playlistId = searchParams.get('playlistId');

		const res = await deleteIndividualPlaylistInfo(playlistId as string);
		return NextResponse.json(res, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
