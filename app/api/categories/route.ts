import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const categories = await prisma.category.findMany({
			select: {
				id: true,
				name: true,
			},
		});

		return NextResponse.json(categories);
	} catch (error) {
		return NextResponse.json({ error: 'Failed to load categories' }, { status: 500 });
	}
}
