import { PlaylistThumbnailSkeleton } from './playlist-thumbnail-skeleton';

export const PlaylistGridCardSkeleton = () => {
	return (
		<div className="flex flex-col gap-2 w-ful">
			<PlaylistThumbnailSkeleton />
			<PlaylistGridCardSkeleton />
		</div>
	);
};
