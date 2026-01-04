'use client';

import { FilterCarousel } from '@/components/filter-carousel';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CategoriesSectionProps {
	categoryId?: string;
}

export const CategorySection = ({ categoryId }: CategoriesSectionProps) => {
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		async function load() {
			try {
				const res = await fetch('/api/categories');
				const data = await res.json();

				// Transform into the shape FilterCarousel expects
				const formatted = data.map((c: any) => ({
					value: c.id,
					label: c.name,
				}));

				setCategories(formatted);
			} finally {
				setIsLoading(false);
			}
		}

		load();
	}, []);

	const onSelect = (value: string | null) => {
		const url = new URL(window.location.href);

		if (value) {
			url.searchParams.set('categoryId', value);
		} else {
			url.searchParams.delete('categoryId');
		}

		router.push(url.toString());
	};

	return <FilterCarousel value={categoryId ?? null} data={categories} isLoading={isLoading} onSelect={onSelect} />;
};
