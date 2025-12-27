'use client';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthUI } from '@/context/user-context';
import { ReactionType } from '@/generated/prisma/enums';
import { cn } from '@/lib/utils';
import { CommentDataValue } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import {
	ChevronDownIcon,
	ChevronUpIcon,
	MessageSquareIcon,
	MoreVerticalIcon,
	ThumbsDownIcon,
	ThumbsUpIcon,
	Trash2Icon,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { toast } from 'sonner';
import { CommentForm } from './comment-form';
import { CommentReplies } from './comment-replies';

interface CommentItemProps {
	comment: CommentDataValue;
	getAllComments?: (created?: number) => void;
	variant?: 'reply' | 'comment';
}

export const CommentItem = ({ comment, getAllComments, variant = 'comment' }: CommentItemProps) => {
	const { userInfo: user } = useAuthUI();

	const router = useRouter();
	const [offset, setOffset] = useState<number>(0);
	const [isReplyOpen, setIsReplyOpen] = useState(false);
	const [isRepliesOpen, setIsRepliesOpen] = useState(false);
	const [commentReplies, setCommentReplies] = useState<{ replies: CommentDataValue[]; hasNextPage: boolean }>({
		replies: [],
		hasNextPage: false,
	});

	// console.log('comment ', comment);

	const detectReaction = () => {
		const reaction = comment.commentReaction?.find((reaction) => reaction.userId === user?.id);

		if (reaction) {
			return reaction.reactionType;
		}
		return null;
	};

	const deleteComment = async (commentId: string) => {
		try {
			// setLoadingState(true);

			const resp = await fetch(`/api/comments?id=${commentId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

			// here (1) indicates to fetch latest 5 comments after deletion happened
			getAllComments?.(1);
			if (resp.status == 200) {
				toast.success('Comment has been deleted!');
			} else {
				toast.error('Comment deletion failed!');
			}
		} catch (err) {
			console.log(err);
		}
	};

	const getCommentReplies = async (parentId: string, initial: number = 0) => {
		let count;
		if (initial) {
			count = 0;
		} else {
			setOffset(offset + 1);
			count = (offset + 1) * 5;
		}

		const resp = await fetch(`/api/comment-replies?parentId=${parentId}&offset=${count}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const replies = await resp.json();

		setCommentReplies((prev) => {
			return {
				replies: [...prev.replies, ...replies.replies],
				hasNextPage: replies.hasNextPage,
			};
		});
	};

	const postReactionTypeData = async (reactionType: ReactionType) => {
		try {
			if (!user?.id) {
				router.push('/sign-in');
			}

			const formPayload = {
				commentId: comment.id,
				userId: user!.id,
				reactionType: reactionType,
			};
			await fetch(`/api/comment-reactions`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formPayload),
			});
			// here (1) indicates to fetch latest 5 comments after deletion happened
			getAllComments?.(1);
		} catch (err) {
			console.log(err);
		}
	};

	const commentReplyMethod = () => {
		setIsReplyOpen((prevState) => !prevState);
		getAllComments?.(1);
	};

	const loadReplies = async () => {
		await getCommentReplies(comment.id, 1);
		setIsRepliesOpen((prev) => !prev);
		setCommentReplies({ replies: [], hasNextPage: false });
	};

	return (
		<div>
			<div className="flex gap-4">
				<Link href={`/users/${comment.userId}`}>
					<Avatar>
						<Image
							src={(comment?.user?.image as string) || '/logo/user-placeholder.svg'}
							alt="profile"
							width={32}
							height={32}
							className="rounded-full object-cover"
						/>
					</Avatar>
				</Link>
				<div className="flex-1 min-w-0">
					<Link href={`/users/${comment.userId}`}>
						<div className="flex items-center gap-2 mb-0 5">
							<span className="font-medium text-sm pb-0 5">{comment.user?.name}</span>
							<span>
								{formatDistanceToNow(comment?.createdAt as Date, {
									addSuffix: true,
								})}
							</span>
						</div>
					</Link>
					<p className="text-sm">{comment.value}</p>
					<div className="flex items-center gap-2 mt-1">
						<div className="flex items-center">
							<Button
								variant="ghost"
								size="icon"
								className="size-8"
								onClick={() => postReactionTypeData('like')}
							>
								<ThumbsUpIcon className={cn('size-5', detectReaction() === 'like' && 'fill-black')} />
							</Button>
							<span className="text-xs text-muted-foreground">{comment.likeCount}</span>
							<Button
								variant="ghost"
								size="icon"
								className="size-8"
								onClick={() => postReactionTypeData('dislike')}
							>
								<ThumbsDownIcon
									className={cn('size-5', detectReaction() === 'dislike' && 'fill-black')}
								/>
							</Button>
							<span className="text-xs text-muted-foreground">{comment.dislikeCount}</span>
						</div>
						{variant === 'comment' && (
							<Button variant="ghost" size="sm" className="h-8" onClick={() => commentReplyMethod()}>
								Reply
							</Button>
						)}
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="size-8 cursor-pointer">
							<MoreVerticalIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{variant == 'comment' && (
							<DropdownMenuItem onClick={() => commentReplyMethod()}>
								<MessageSquareIcon className="size-4" />
								Reply
							</DropdownMenuItem>
						)}

						{user?.id == comment.userId && (
							<DropdownMenuItem onClick={() => deleteComment(comment.id)}>
								<Trash2Icon className="size-4" />
								Delete
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			{isReplyOpen && variant === 'comment' && (
				<div className="mt-4 pl-14">
					<CommentForm
						videoId={comment.videoId}
						parentId={comment.id}
						variant="reply"
						getAllComments={getAllComments}
						onCancel={() => setIsReplyOpen(false)}
						onSuccess={() => {
							setIsRepliesOpen(true);
							setIsReplyOpen(false);
						}}
					/>
				</div>
			)}

			{/* {JSON.stringify(commentReplies)} */}

			{comment._count.replies > 0 && variant === 'comment' && (
				<div className="pl-14">
					<Button variant="tertiary" size="sm" onClick={() => loadReplies()}>
						{isRepliesOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
						{comment._count.replies} replies{' '}
					</Button>
				</div>
			)}

			{comment._count.replies > 0 && variant === 'comment' && isRepliesOpen && (
				<CommentReplies
					parentId={comment.id}
					videoId={comment.videoId}
					comment={comment}
					getCommentReplies={getCommentReplies}
					replies={commentReplies}
				/>
			)}
		</div>
	);
};
