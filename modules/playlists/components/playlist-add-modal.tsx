'use client';

import { ResponsiveModal } from '@/components/responsive-modal';
import { Button } from '@/components/ui/button';
import { useAuthUI } from '@/context/user-context';
import { PlaylistSchema } from '@/schema';
import { Playlists } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon, SquareCheckIcon, SquareIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

interface PlaylistAddModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	reloadThePage?: () => void;
	videoId: string;
}

export const PlaylistAddModal = ({ open, onOpenChange, reloadThePage, videoId }: PlaylistAddModalProps) => {
	const { userInfo: user } = useAuthUI();
	const [isLoading, setIsLoading] = useState(false);
	const [Playlist, setPlayList] = useState<Playlists[]>([]);

	const form = useForm<z.infer<typeof PlaylistSchema>>({
		resolver: zodResolver(PlaylistSchema),
		defaultValues: {
			name: '',
		},
	});

	const getPlaylists = async (currentOffset = 0, initialLoad = true) => {
		try {
			if (!user) {
				return;
			}
			const count = currentOffset * 5;
			setIsLoading(true);
			const res = await fetch(`/api/playlist-api?userId=${user?.id}`, {
				method: 'GET',
			});
			setIsLoading(false);

			const response = await res.json();

			console.log('playlist ', response);

			setPlayList(response);
		} catch (err) {
			console.log(err);
		}
	};

	const checkIFVideoExistsInthePlaylist = (playlist: Playlists) => {};

	const addOrRemoveFromPlaylist = async (playlist: Playlists) => {
		try {
			const payload = {
				videoId,
				playlistId: playlist.id,
			};
			await fetch(`/api/create-playlist-api`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getPlaylists();
	}, [user]);

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
				reloadThePage?.();
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
		<ResponsiveModal title="Add to playlist" open={open} onOpenChange={onOpenChange}>
			<div className="flex flex-col gap-2">
				{isLoading && (
					<div className="flex justify-center p-4">
						<Loader2Icon className="size-5 animate-spin text-muted-foreground" />
					</div>
				)}

				{Playlist.map((item) => (
					<Button
						key={item.id}
						variant="ghost"
						className="w-full justify-start px-2 [&_svg]:size-5"
						size="lg"
						onClick={() => addOrRemoveFromPlaylist(item)}
					>
						{isLoading ? <SquareCheckIcon className="mr-2" /> : <SquareIcon className="mr-2" />}
						{item?.name}
					</Button>
				))}
			</div>
		</ResponsiveModal>
	);
};
