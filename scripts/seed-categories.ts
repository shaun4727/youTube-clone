import 'dotenv/config';

import prisma from '@/lib/db';

const categoryNames = [
	'Gaming',
	'Music',
	'Vlogs',
	'Comedy',
	'News & Politics',
	'Entertainment',
	'Science & Technology',
	'Education',
	'How-To & Style',
	'Sports',
	'Food & Cooking',
	'Travel & Events',
	'Pets & Animals',
];

// execute this function/ seed categories from package.json

async function main() {
	console.log('Seeding categories...');

	try {
		const values = categoryNames.map((name) => ({
			name,
			description: `Videos related to ${name.toLowerCase()}`,
		}));

		await prisma.category.createMany({
			data: values,
			skipDuplicates: true, // ★ prevents unique constraint errors
		});

		console.log('Categories seeded successfully!');
	} catch (err) {
		console.error('Error seeding categories:', err);
		process.exit(1);
	}
}

main();
