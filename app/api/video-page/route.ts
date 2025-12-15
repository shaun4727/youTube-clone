import { getVideoInfoWithUser } from '@/data/video-page';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const id = searchParams.get('id') || '0';
		const userId = searchParams.get('userId') || '0';

		const videoWithUserInfo = await getVideoInfoWithUser(id, userId);

		return NextResponse.json(videoWithUserInfo, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
	}
}
