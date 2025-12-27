'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useAuthUI } from '@/context/user-context';
import { CommentSchema } from '@/schema';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

interface CommentFormProps {
	getAllComments?: (created?: number) => void;
	videoId?: string;
	onSuccess?: () => void;
	onCancel?: () => void;
	parentId?: string;
	variant: 'reply' | 'comment';
}

export const CommentForm = ({ getAllComments, parentId, onCancel, variant = 'comment' }: CommentFormProps) => {
	const { userInfo: user } = useAuthUI();
	const params = useParams();
	const videoId = params.videoId;
	const router = useRouter();

	const form = useForm<z.infer<typeof CommentSchema>>({
		resolver: zodResolver(CommentSchema),
		defaultValues: {
			value: '',
			parentId: parentId,
		},
	});

	const onSubmit = async (value: z.infer<typeof CommentSchema>) => {
		try {
			if (!user?.image) {
				router.push('/sign-in');
				return;
			}
			if (!value.value) {
				return;
			}

			let toastId: string | number = '1';
			const formPayload = {
				userId: user?.id,
				videoId: videoId,
				parentId: parentId ?? null,
				...value,
			};

			const res = await fetch('/api/comments', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formPayload),
			});

			if (res.status == 200) {
				form.reset();
				getAllComments?.(1);
				onCancel?.();
				toastId = toast.success('Comment updated successfully!', { id: toastId });
			} else {
				toast.error('Video update failed!', { id: toastId });
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleCancel = () => {
		form.reset();
		onCancel?.();
	};

	return (
		<>
			<Avatar>
				<Image
					src={(user?.image as string) || '/logo/user-placeholder.svg'}
					alt="profile"
					width={32}
					height={32}
					className="rounded-full object-cover"
				/>
			</Avatar>
			<Form {...form}>
				<form className="flex gap-4 group" onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex-1">
						<FormField
							control={form.control}
							name="value"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Textarea
											{...field}
											placeholder={
												variant === 'reply' ? 'Reply to this comment...' : 'Add to a comment'
											}
											className="resize-none bg-transparent overflow-hidden "
											rows={10}
											cols={6}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="justify-end gap-2 mt-2 flex">
							{onCancel && (
								<Button variant="ghost" type="button" onClick={handleCancel}>
									Cancel
								</Button>
							)}

							<Button type="submit" size="sm">
								{variant === 'reply' ? 'Reply' : 'Comment'}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</>
	);
};
