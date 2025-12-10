import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const body = await request.json();

	const { type, data } = body;

	if (type === 'video.asset.ready') {
		console.log('upload ready data ', data);
	} else if (type === 'video.asset.asset_created') {
		console.log('asset upload complete ', data);
	}

	return NextResponse.json({ success: 'Upload Succeeded' }, { status: 200 });
}
