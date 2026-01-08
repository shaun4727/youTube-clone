import { Playlists } from '@/types';
import Link from 'next/link';
import { PlaylistInfo } from './playlist-info';
import { PlaylistThumbnail } from './playlist-thumbnail';

interface PlaylistGridCardProps {
	data: Playlists | undefined;
}

export const PlaylistGridCard = ({ data }: PlaylistGridCardProps) => {
	return (
		<Link href={`/playlists/${data?.id}`}>
			<div className="flex flex-col gap-2 w-full group">
				<PlaylistThumbnail imageUrl="/logo/placeholder.svg" title={data?.name} videoCount={data?.videoCount} />
				<PlaylistInfo data={data} />
			</div>
		</Link>
	);
};
