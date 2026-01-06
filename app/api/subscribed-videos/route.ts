import { getVideosForSubscriptionPage } from '@/data/subscriptions';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const viewerId = searchParams.get('viewerId');

		if (!viewerId) {
			return NextResponse.json({ error: 'Missing required ID' }, { status: 400 });
		}

		const subscribedVideos = await getVideosForSubscriptionPage(viewerId);

		return NextResponse.json(subscribedVideos, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
