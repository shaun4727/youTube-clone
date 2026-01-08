import { Skeleton } from '@/components/ui/skeleton';

export const PlaylistThumbnailSkeleton = () => {
	return (
		<div className="relative w-full overflow-hidden rounded-xl aspect-video">
			<Skeleton className="size-full" />
		</div>
	);
};
