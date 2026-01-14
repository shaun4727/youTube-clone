import { getSubscriptionsList } from '@/data/subscriptions';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get('userId');
		const offset = searchParams.get('offset');

		if (!userId) {
			return NextResponse.json({ error: 'Missing required ID' }, { status: 400 });
		}

		const subscriptionsList = await getSubscriptionsList(userId, Number(offset));

		return NextResponse.json(subscriptionsList, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
