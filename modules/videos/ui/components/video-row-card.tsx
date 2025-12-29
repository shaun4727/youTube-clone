import { cva, VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { VideoThumbnail } from './video-thumbnail';

const videoRowCardVariants = cva('group flex min-w-0', {
	variants: {
		size: {
			default: 'gap-4',
			compact: 'gap-2',
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

const thumbnailVariants = cva('relative flex-none', {
	variants: {
		size: {
			default: 'w-[38%]',
			compact: 'w-[168px]',
		},
	},
	defaultVariants: {
		size: 'default',
	},
});

interface VideoRowCardProps extends VariantProps<typeof videoRowCardVariants> {
	data: {
		id: string;
		thumbnailUrl: string;
		previewUrl: string;
		title: string;
		duration: number;
	};
	onRemove?: () => void;
}

export const VideoRowCardSkeleton = () => {
	return <div>Skeleton</div>;
};

export const VideoRowCard = ({ data, size, onRemove }: VideoRowCardProps) => {
	return (
		<div className={videoRowCardVariants({ size })}>
			<Link href={`/videos/${data.id}`} className={thumbnailVariants({ size })}>
				<VideoThumbnail
					imageUrl={data.thumbnailUrl}
					previewUrl={data.previewUrl}
					title={data.title}
					duration={data.duration}
				/>
			</Link>
		</div>
	);
};
