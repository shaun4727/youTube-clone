import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import { SubscriptionButton } from './subscription-button';

interface SubscriptionItemProps {
	name: string | null | undefined;
	imageUrl: string | null | undefined;
	subscriberCount: number;
	onUnsubscribe: () => void;
}

export const SubscriptionItem = ({ name, imageUrl, subscriberCount, onUnsubscribe }: SubscriptionItemProps) => {
	return (
		<>
			<div className="flex items-start gap-4">
				<Avatar>
					<Image
						src={imageUrl as string}
						alt="profile"
						width={32}
						height={32}
						className="rounded-full object-cover"
					/>
				</Avatar>
				<div className="flex-1">
					<div className="flex items-center justify-between">
						<div>
							<h3 className="text-sm">{name}</h3>
							<p className="text-xs text-muted-foreground">{subscriberCount} subscribers</p>
						</div>
						<SubscriptionButton size="sm" onClick={() => {}} disabled={false} isSubscribed={true} />
					</div>
				</div>
			</div>
		</>
	);
};
