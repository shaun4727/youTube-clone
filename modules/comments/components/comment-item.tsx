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
import { CommentDataValue } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquareIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { toast } from 'sonner';

interface CommentItemProps {
	comment: CommentDataValue;
	getAllComments: (created?: number) => void;
}

export const CommentItem = ({ comment, getAllComments }: CommentItemProps) => {
	const { userInfo: user } = useAuthUI();

	const deleteComment = async (commentId: string) => {
		try {
			// setLoadingState(true);

			const resp = await fetch(`/api/comments?id=${commentId}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			});

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
					{/* TODO: Comment Reaction */}
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
