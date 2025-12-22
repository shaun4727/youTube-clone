import { Avatar } from '@/components/ui/avatar';
import { CommentDataValue } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

interface CommentItemProps {
	comment: CommentDataValue;
}

export const CommentItem = ({ comment }: CommentItemProps) => {
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
				</div>
			</div>
		</div>
	);
};
