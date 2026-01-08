import { ResponsiveModal } from '@/components/responsive-modal';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useAuthUI } from '@/context/user-context';
import { PlaylistSchema } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

interface PlaylistCreateModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const PlaylistCreateModal = ({ open, onOpenChange }: PlaylistCreateModalProps) => {
	const { userInfo: user } = useAuthUI();

	const form = useForm<z.infer<typeof PlaylistSchema>>({
		resolver: zodResolver(PlaylistSchema),
		defaultValues: {
			name: '',
		},
	});

	const submitPlaylistData = async (value: z.infer<typeof PlaylistSchema>) => {
		try {
			let toastId: string | number = '1';
			const formPayload = {
				userId: user?.id,
				name: value.name,
			};

			const res = await fetch('/api/playlist-api', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formPayload),
			});

			if (res.status == 200) {
				form.reset();
				toastId = toast.success('Comment updated successfully!', { id: toastId });
			} else {
				toast.error('Playlist creation failed!', { id: toastId });
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<ResponsiveModal title="Upload a thumbnail" open={open} onOpenChange={onOpenChange}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(submitPlaylistData)}>
					<FormField
						control={form.control}
						name="name"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...field} placeholder="My favorite videos" />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="flex justify-end mt-2">
						<Button disabled={false} type="submit">
							Create
						</Button>
					</div>
				</form>
			</Form>
		</ResponsiveModal>
	);
};
