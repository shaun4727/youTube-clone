import { getUserDataWithId } from '@/data/user';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const { searchParams } = new URL(req.url);
		const userId = searchParams.get('userId');

		if (!userId) {
			return NextResponse.json({ error: 'Missing video ID' }, { status: 400 });
		}

		const userInformation = await getUserDataWithId(userId);
		return NextResponse.json(userInformation, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
