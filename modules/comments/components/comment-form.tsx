'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuthUI } from '@/context/user-context';
import { CommentFormProps } from '@/types';
import Image from 'next/image';

// interface CommentFormProps {
// 	videoId: string;
// 	onSuccess?: () => void;
// }

export const CommentForm = ({}: CommentFormProps) => {
	const { userInfo: user } = useAuthUI();

	return (
		<form className="flex gap-4 group">
			<Avatar>
				<Image
					src={(user?.image as string) || '/logo/user-placeholder.svg'}
					alt="profile"
					width={32}
					height={32}
					className="rounded-full object-cover"
				/>
			</Avatar>
			<div className="flex-1">
				<Textarea
					placeholder="Add a comment"
					className="resize-none bg-transparent overflow-hidden "
					rows={10}
					cols={6}
				/>
				<div className="justify-end gap-2 mt-2 flex">
					<Button type="submit" size="sm">
						Comment
					</Button>
				</div>
			</div>
		</form>
	);
};
