import { HomeView } from '@/modules/home/ui/views/home-view';

interface PageProps {
	searchParams: Promise<{
		categoryId?: string;
	}>;
}

export default async function Page({ searchParams }: PageProps) {
	// const categories = await getCategories();

	const { categoryId } = await searchParams;

	return (
		// <Suspense fallback={<p>Loading...</p>}>
		// 	<ErrorBoundary fallback={<p>Something went wrong</p>}>
		// 		<PageClient categories={categories} />
		// 	</ErrorBoundary>
		// </Suspense>
		<HomeView categoryId={categoryId} />
		// <div>hello</div>
	);
}
