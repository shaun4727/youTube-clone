import { Suspense } from 'react';

export const CommentsSection = () => {
	return (
		<div>
			<Suspense fallback="<p>Loading...</p>">
				<p>Comments will go here</p>
			</Suspense>
		</div>
	);
};
