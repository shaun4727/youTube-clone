import { InfiniteScroll } from '@/components/infinite-scroll';
import { DEFAULT_LIMIT } from '@/constants';
import { CommentDataValue } from '@/types';
import { CommentItem } from './comment-item';

interface commentRepliesProps {
	parentId: string;
	videoId: string;
	replies: { replies: CommentDataValue[]; hasNextPage: boolean };
	comment: CommentDataValue;
	getCommentReplies: (parentId: string) => void;
}

export const CommentReplies = ({ parentId, videoId, replies, comment, getCommentReplies }: commentRepliesProps) => {
	const fetchNextCommentPage = () => {
		getCommentReplies(comment.id);
	};
	return (
		<div className="pl-14">
			<div className="flex flex-col gap-4 mt-2">
				{/* {replies &&
					replies?.map((comment) => <CommentItem key={comment.id} comment={comment} variant="reply" />)} */}
				{replies.replies?.map((comment) => (
					<CommentItem key={comment.id} comment={comment} variant="reply" />
				))}
			</div>
			{comment._count.replies > DEFAULT_LIMIT && (
				<InfiniteScroll
					isManual={true}
					hasNextPage={replies.hasNextPage as boolean}
					isFetchingNextPage={false}
					fetchNextPage={fetchNextCommentPage}
				/>
			)}
		</div>
	);
};
