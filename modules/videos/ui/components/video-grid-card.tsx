import { SingleVideoTypeWithUser } from '@/types';
import Link from 'next/link';
import { VideoInfo } from './video-info';
import { VideoThumbnail } from './video-thumbnail';

interface VideoGridCardProps {
	data: SingleVideoTypeWithUser;
	onRemove?: (e: React.MouseEvent<HTMLDivElement>, videoId: string) => void;
}

export const VideoGridCard = ({ data, onRemove }: VideoGridCardProps) => {
	return (
		<div className="flex flex-col gap-2 w-full group">
			<Link href={`/videos/${data.id}`}>
				<VideoThumbnail
					imageUrl={data.thumbnailUrl}
					previewUrl={data.previewUrl}
					title={data.name}
					duration={data.duration ?? 0}
				/>
			</Link>
			<VideoInfo data={data} onRemove={onRemove} />
		</div>
	);
};
