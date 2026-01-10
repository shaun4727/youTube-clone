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
	const [loadingFrom, setIsLoadingFrom] = useState(false);
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
			setPlayList(response);
		} catch (err) {
			console.log(err);
		}
	};

	const checkIFVideoExistsInthePlaylist = (playlist: Playlists) => {
		let found = false;

		playlist.videos.forEach((item) => {
			if (item.videoId === videoId) {
				found = true;
			}
		});

		return found;
	};

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

			setIsLoadingFrom(true);
			await getPlaylists();
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getPlaylists();
	}, [user]);

	return (
		<ResponsiveModal title="Add to playlist" open={open} onOpenChange={onOpenChange}>
			<div className="flex flex-col gap-2">
				{isLoading && !loadingFrom && (
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
						{checkIFVideoExistsInthePlaylist(item) ? (
							<SquareCheckIcon className="mr-2" />
						) : (
							<SquareIcon className="mr-2" />
						)}
						{item?.name}
					</Button>
				))}
			</div>
		</ResponsiveModal>
	);
};
