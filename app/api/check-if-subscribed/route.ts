import { checkIfUserSubscribed } from '@/data/subscriptions';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const viewerId = searchParams.get('userId');
		const creatorId = searchParams.get('creatorId');

		if (!viewerId && !creatorId) {
			return NextResponse.json({ error: 'Missing required ID' }, { status: 400 });
		}

		const subscriptionsList = await checkIfUserSubscribed(viewerId as string, creatorId as string);

		return NextResponse.json(subscriptionsList, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
