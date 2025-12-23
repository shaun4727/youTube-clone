'use client';

import { InfiniteScroll } from '@/components/infinite-scroll';
import { CommentForm } from '@/modules/comments/components/comment-form';
import { CommentItem } from '@/modules/comments/components/comment-item';
import { CommentDataValue } from '@/types';
import { useEffect, useState } from 'react';

export const CommentsSection = () => {
	const [allComments, setAllComments] = useState<{ commentsWithLimit: CommentDataValue[]; hasNextPage: Boolean }>();
	const [loading, setLoading] = useState<boolean>(false);
	const [offset, setOffset] = useState<number>(-1);

	// useEffect(() => {
	// 	getVideoFunc();

	// 	return () => {
	// 		setStudioVid({
	// 			hasNextPage: false,
	// 			studioVideosWithLimit: [],
	// 		});
	// 	};
	// }, []);

	const getAllComments = async (created?: number) => {
		try {
			// setLoadingState(true);

			let count = 0;
			if (created !== 1) {
				setOffset(offset + 1);
				count = (offset + 1) * 5;
			}

			const resp = await fetch(`/api/comments?offset=${count}`, {
				method: 'GET',
				cache: 'no-store',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const comments = await resp.json();

			setAllComments((prevRes) => {
				if (created === 1) {
					return comments;
				}

				if (!prevRes?.commentsWithLimit?.length) {
					return comments;
				}

				return {
					commentsWithLimit: [...prevRes.commentsWithLimit, ...comments.commentsWithLimit],
					hasNextPage: comments.hasNextPage,
				};
			});
		} catch (err) {
			console.log(err);
		}
	};

	const removeDeletedComment = (commentId: string) => {
		// Find the index of the comment where the ID matches
		const index = allComments!.commentsWithLimit.findIndex((comment) => comment.id === commentId);

		// Check if it was found
		if (index !== -1) {
			allComments!.commentsWithLimit?.splice(index, 1);
		} else {
			console.log('Comment not found in the list');
		}
	};

	useEffect(() => {
		getAllComments();
		// return () => {
		// 	setAllComments({
		// 		hasNextPage: false,
		// 		commentsWithLimit: [],
		// 	});
		// };
	}, []);

	return (
		<div className="mt-6">
			<div className="flex flex-col gap-6">
				<h1>
					{' '}
					{allComments && allComments.commentsWithLimit && allComments.commentsWithLimit.length} Comments
				</h1>
				<CommentForm getAllComments={getAllComments} />

				<div className="flex flex-col gap-4 mt-2">
					{allComments &&
						allComments.commentsWithLimit?.map((comment, index) => (
							<CommentItem key={index} comment={comment} getAllComments={getAllComments} />
						))}
				</div>
				<InfiniteScroll
					isManual={true}
					hasNextPage={allComments?.hasNextPage as boolean}
					isFetchingNextPage={loading}
					fetchNextPage={getAllComments}
				/>
			</div>
		</div>
	);
};
