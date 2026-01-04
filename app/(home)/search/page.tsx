import { SearchView } from '@/modules/search/ui/views/search-view';

export const dynamic = 'force-dynamic';

interface PageProps {
	searchParams: Promise<{
		query: string;
		categoryId: string | undefined;
	}>;
}

const page = async ({ searchParams }: PageProps) => {
	const { query, categoryId } = await searchParams;

	return <SearchView query={query} categoryId={categoryId} />;
};

export default page;
