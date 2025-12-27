import { CommentDataValue } from '@/types';
import { CommentItem } from './comment-item';

interface commentRepliesProps {
	parentId: string;
	videoId: string;
	replies: CommentDataValue[];
}

export const CommentReplies = ({ parentId, videoId, replies }: commentRepliesProps) => {
	return (
		<div className="pl-14">
			<div className="flex flex-col gap-4 mt-2">
				{/* {replies &&
					replies?.map((comment) => <CommentItem key={comment.id} comment={comment} variant="reply" />)} */}
				{replies?.map((comment) => (
					<CommentItem key={comment.id} comment={comment} variant="reply" />
				))}
				{JSON.stringify(replies.length)}
			</div>
		</div>
	);
};
