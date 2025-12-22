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
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

interface CommentFormProps {
	setLoading: Dispatch<SetStateAction<boolean>>;
}

export const CommentForm = ({ setLoading }: CommentFormProps) => {
	const { userInfo: user } = useAuthUI();
	const params = useParams();
	const videoId = params.videoId;
	const router = useRouter();

	const form = useForm<z.infer<typeof CommentSchema>>({
		resolver: zodResolver(CommentSchema),
		defaultValues: {
			value: '',
		},
	});

	const onSubmit = async (value: z.infer<typeof CommentSchema>) => {
		try {
			if (!user?.image) {
				router.push('/sign-in');
				return;
			}
			let toastId: string | number = '1';
			const formPayload = {
				userId: user?.id,
				videoId: videoId,
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
				toastId = toast.success('Video updated successfully!', { id: toastId });
				setLoading(true);
			} else {
				toast.error('Video update failed!', { id: toastId });
			}
		} catch (err) {
			console.log(err);
		}
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
											placeholder="Add a comment"
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
							<Button type="submit" size="sm">
								Comment
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</>
	);
};
