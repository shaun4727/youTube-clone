'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { individualPlaylist } from '@/types';
import { Trash2Icon } from 'lucide-react';

interface PlaylistHeaderSection {
	playlistInfo: individualPlaylist;
	removePlaylistMethod: () => Promise<void>;
}

export const PlaylistHeaderSection = ({ playlistInfo, removePlaylistMethod }: PlaylistHeaderSection) => {
	const removePlaylist = async () => {
		await removePlaylistMethod();
	};
	return (
		<div className="flex justify-between items-center">
			<div>
				<h1 className="text-2xl font-bold">{playlistInfo?.playlistInfoWithLimit?.name}</h1>
				<p className="text-xs text-muted-foreground">Videos from Playlist</p>
			</div>

			<Button variant="outline" size="icon" className="rounded-full" onClick={() => removePlaylist()}>
				<Trash2Icon />
			</Button>
		</div>
	);
};

const PlaylistHeaderSectionSkeleton = () => {
	return (
		<div className="flex flex-col gap-y-2">
			<Skeleton className="h-6 w-24" />
			<Skeleton className="h-4 w-32" />
		</div>
	);
};
