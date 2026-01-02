export const dynamic = 'force-dynamic';

interface PageProps {
	searchParams: Promise<{
		query: string;
		categoryId: string | undefined;
	}>;
}

const page = async ({ searchParams }: PageProps) => {
	const { query, categoryId } = await searchParams;

	return (
		<div>
			Searching for {query} in {categoryId}
		</div>
	);
};

export default page;
