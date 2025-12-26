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
import { MessageSquareIcon, MoreVerticalIcon, ThumbsDownIcon, ThumbsUpIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { toast } from 'sonner';

interface CommentItemProps {
	comment: CommentDataValue;
	getAllComments: (created?: number) => void;
}

export const CommentItem = ({ comment, getAllComments }: CommentItemProps) => {
	const { userInfo: user } = useAuthUI();

	const router = useRouter();

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
			getAllComments(1);
			if (resp.status == 200) {
				toast.success('Comment has been deleted!');
			} else {
				toast.error('Comment deletion failed!');
			}
		} catch (err) {
			console.log(err);
		}
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
			getAllComments(1);
		} catch (err) {
			console.log(err);
		}
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
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="size-8 cursor-pointer">
							<MoreVerticalIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => {}}>
							<MessageSquareIcon className="size-4" />
							Reply
						</DropdownMenuItem>
						{user?.id == comment.userId && (
							<DropdownMenuItem onClick={() => deleteComment(comment.id)}>
								<Trash2Icon className="size-4" />
								Delete
							</DropdownMenuItem>
						)}
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
};
