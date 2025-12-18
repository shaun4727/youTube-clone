import { checkSubscription, subscriptionProcessCreation, totalSubscription } from '@/data/subscriptions';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const newSubscription = await subscriptionProcessCreation(body);

		return NextResponse.json(newSubscription, { status: 200 });
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: 'Failed to create video views' }, { status: 500 });
	}
}

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const creatorId = searchParams.get('creatorId');
		const viewerId = searchParams.get('viewerId');

		if (!creatorId || !viewerId) {
			return NextResponse.json({ error: 'Missing required ID' }, { status: 400 });
		}

		const subscriptionStatus = await checkSubscription(creatorId, viewerId);
		const subscriptions = await totalSubscription(viewerId);

		return NextResponse.json({ status: subscriptionStatus, subscriptionList: subscriptions }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
