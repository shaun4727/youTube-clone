'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import { SearchedType } from '@/types';
import { useEffect, useState } from 'react';

interface ResultsSectionProps {
	query: string | undefined;
	categoryId: string | undefined;
}

export const ResultsSection = ({ query, categoryId }: ResultsSectionProps) => {
	const [searchedVideo, setSearchedVideo] = useState<SearchedType>({
		resultedVideosWithLimit: [],
		hasNextPage: false,
	});

	// Start at 0 for the first page
	const [offset, setOffset] = useState<number>(0);

	const isMobile = useIsMobile();

	const getSearchedResultsMethod = async (currentOffset: number, isNewQuery: boolean) => {
		// Use the passed parameter instead of the state variable to avoid lag
		const count = currentOffset * 5;

		const res = await fetch(`/api/search-videos?offset=${count}&query=${query}&categoryId=${categoryId ?? ''}`, {
			method: 'GET',
		});
		const result = await res.json();

		setSearchedVideo((prev) => {
			if (isNewQuery) return result;
			return {
				resultedVideosWithLimit: [...prev.resultedVideosWithLimit, ...result.resultedVideosWithLimit],
				hasNextPage: result.hasNextPage,
			};
		});
	};

	// Triggered whenever the query or category changes
	useEffect(() => {
		// Reset local logic for a fresh search
		setOffset(0);
		setSearchedVideo({ resultedVideosWithLimit: [], hasNextPage: false });

		// Fetch the first page (offset 0)
		getSearchedResultsMethod(0, true);
	}, [query, categoryId]);

	return (
		<div>
			<pre>{JSON.stringify(searchedVideo, null, 2)}</pre>
		</div>
	);
};
