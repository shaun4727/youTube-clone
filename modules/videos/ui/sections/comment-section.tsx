'use client';

import { CommentForm } from '@/modules/comments/components/comment-form';
import { CommentItem } from '@/modules/comments/components/comment-item';
import { CommentDataValue } from '@/types';
import { useEffect, useState } from 'react';

export const CommentsSection = () => {
	const [allComments, setAllComments] = useState<{ allComments: CommentDataValue[] }>();
	const [loading, setLoading] = useState<boolean>(false);

	const getAllComments = async () => {
		try {
			const resp = await fetch(`/api/comments`, {
				method: 'GET',
				cache: 'no-store',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const comments = await resp.json();
			setAllComments(comments);
			setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getAllComments();
	}, [loading]);

	return (
		<div className="mt-6">
			<div className="flex flex-col gap-6">
				<h1>0 Comments</h1>
				<CommentForm setLoading={setLoading} />
				<div className="flex flex-col gap-4 mt-2">
					{allComments &&
						allComments.allComments?.map((comment, index) => <CommentItem key={index} comment={comment} />)}
				</div>
			</div>
		</div>
	);
};
