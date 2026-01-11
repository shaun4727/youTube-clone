import { Avatar } from '@/components/ui/avatar';
import { UserInfo } from '@/modules/users/ui/components/userInfo';
import { SingleVideoTypeWithUser } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { VideoMenu } from './video-menu';

interface VideoInfoProps {
	data: SingleVideoTypeWithUser;
	onRemove?: (e: React.MouseEvent<HTMLDivElement>, videoId: string) => void;
}

export const VideoInfo = ({ data, onRemove }: VideoInfoProps) => {
	const compactViews = useMemo(() => {
		return Intl.NumberFormat('en', {
			notation: 'compact',
		}).format(data._count.videoViews);
	}, [data._count.videoViews || 0]);

	const compactDate = useMemo(() => {
		return formatDistanceToNow(data.createdAt, { addSuffix: true });
	}, [data.createdAt]);

	return (
		<div className="flex gap-3">
			<Link href={`/users/${data.user?.id}`}>
				<Avatar>
					<Image
						src={data.user?.image as string}
						alt="profile"
						width={32}
						height={32}
						className="rounded-full object-cover"
					/>
				</Avatar>
			</Link>
			<div className="min-w-0 flex-1">
				<Link href={`/videos/${data.id}`}>
					<h3 className="font-medium line-clamp-1 lg:line-clamp-2 text-base wrap-break-word">
						{' '}
						{data.name}{' '}
					</h3>
				</Link>
				<Link href={`/users/${data.user?.id}`}>
					<UserInfo size="sm" name={data.user?.name} />
				</Link>
				<Link href={`/videos/${data.id}`}>
					<p className="text-sm text-gray-600 line-clamp-1">
						{compactViews} views &#8226; {compactDate}
					</p>
				</Link>
			</div>
			<div className="shrink-0">
				<VideoMenu videoId={data.id} onRemove={onRemove} variant="ghost" />
			</div>
		</div>
	);
};
