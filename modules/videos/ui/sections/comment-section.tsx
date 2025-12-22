import { CommentForm } from '@/modules/comments/components/comment-form';

export const CommentsSection = () => {
	return (
		<div className="mt-6">
			<div className="flex flex-col gap-6">
				<h1>0 Comments</h1>
				<CommentForm videoId="1" />
			</div>
		</div>
	);
};
