import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useAuthUI } from '@/context/user-context';
import { SubscriptionButton } from '@/modules/subscriptions/ui/components/subscription-button';
import { UserInfo } from '@/modules/users/ui/components/userInfo';
import { User } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface VideoOwnerProps {
	user: User | null;
	videoId: string;
}

export const VideoOwner = ({ user = null, videoId }: VideoOwnerProps) => {
	const { userInfo } = useAuthUI();

	return (
		<div className="flex items-center sm:items-start justify-between sm:justify-start gap-3 min-w-0">
			<Link href={`/users/${user?.id}`}>
				<div className="flex items-center gap-3 min-w-0">
					<Avatar>
						<Image
							src={user?.image as string}
							alt="profile"
							width={32}
							height={32}
							className="rounded-full object-cover"
						/>
					</Avatar>
					<div className="flex flex-col gap-1">
						<UserInfo size="lg" name={user?.name} />
						<span>{0} subscriber</span>
					</div>
				</div>
			</Link>
			{userInfo?.id === user?.id ? (
				<Button variant="secondary" className="rounded-full" asChild>
					<Link href={`/studio/videos/${videoId}`}>Edit Video</Link>
				</Button>
			) : (
				<SubscriptionButton onClick={() => {}} disabled={false} isSubscribed={false} className="flex-none" />
			)}
		</div>
	);
};
