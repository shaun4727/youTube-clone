import { Avatar } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { UserInfo } from '@/modules/users/ui/components/userInfo';
import { SingleVideoTypeWithUser } from '@/types';
import { cva, VariantProps } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { VideoMenu } from './video-menu';
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
	data: SingleVideoTypeWithUser;
	onRemove?: (e: React.MouseEvent<HTMLDivElement>, videoId: string) => void;
}

export const VideoRowCardSkeleton = () => {
	return <div>Skeleton</div>;
};

export const VideoRowCard = ({ data, size, onRemove }: VideoRowCardProps) => {
	const compactViews = useMemo(() => {
		return Intl.NumberFormat('en', {
			notation: 'compact',
		}).format(data._count.videoViews);
	}, [data._count.videoViews || 0]);

	const compactLikes = useMemo(() => {
		return Intl.NumberFormat('en', {
			notation: 'compact',
		}).format(data.likeCount || 0);
	}, [data.likeCount]);

	return (
		<div className={videoRowCardVariants({ size })}>
			<Link href={`/videos/${data.id}`} className={thumbnailVariants({ size })}>
				<VideoThumbnail
					imageUrl={data.thumbnailUrl}
					previewUrl={data.previewUrl}
					title={data.name}
					duration={data.duration}
				/>
			</Link>

			{/* Info */}
			<div className="flex-1 min-w-0">
				<div className="flex justify-between gap-x-2">
					<Link href={`/videos/${data.id}`} className="flex-1 min-w-0">
						<h3 className={cn('font-medium line-clamp-2', size === 'compact' ? 'text-sm' : 'text-base')}>
							{data.name}
						</h3>

						{size === 'compact' && (
							<>
								<div className="flex items-center gap-2 my-3">
									<Avatar>
										<Image
											src={data.user?.image as string}
											alt="profile"
											width={32}
											height={32}
											className="rounded-full object-cover"
										/>
									</Avatar>
									<div className="flex flex-col gap-0">
										<UserInfo size="sm" name={data.user?.name} />
										<p className="text-xs text-muted-foreground mt-1">
											{compactViews} views &#8226; {compactLikes} likes{' '}
										</p>
									</div>
									<div className="shrink-0 flex justify-end w-3/4">
										<VideoMenu videoId={data.id} onRemove={onRemove} variant="ghost" />
									</div>
								</div>

								<Tooltip>
									<TooltipTrigger asChild>
										<p className="text-xs text-muted-foreground w-fit line-clamp-2">
											{data.description ?? 'No description'}
										</p>
									</TooltipTrigger>
									<TooltipContent side="bottom" align="center" className="bg-black/70">
										<p>From the video description</p>
									</TooltipContent>
								</Tooltip>
							</>
						)}
					</Link>
				</div>
			</div>
		</div>
	);
};
