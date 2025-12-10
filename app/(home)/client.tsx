'use client';

interface Category {
	id: string;
	name: string;
}

export const PageClient = ({ categories }: { categories: Category[] | null }) => {
	return (
		<div>
			{categories && categories.length > 0 ? categories.map((cat) => <div key={cat.id}>{cat.name}</div>) : ''}
		</div>
	);
};
