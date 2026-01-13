'use client';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthUI } from '@/context/user-context';
import { cn } from '@/lib/utils';
import { User } from '@/types';
import { Edit2Icon } from 'lucide-react';
import { useState } from 'react';
import { BannerUploadModal } from './banner-upload-modal';

interface UserPageBannerProps {
	user: User | undefined;
	getUserData: (userId: string | null | undefined) => Promise<void>;
}

export const UserPageBanner = ({ user, getUserData }: UserPageBannerProps) => {
	const { userInfo: AuthUser } = useAuthUI();
	const [isBannerUploadModalOpen, setIsBannerUploadModalOpen] = useState(false);

	const uploadBanner = () => {
		setIsBannerUploadModalOpen(true);
	};

	return (
		<div className="relative group">
			<BannerUploadModal
				userId={user?.id}
				open={isBannerUploadModalOpen}
				onOpenChange={setIsBannerUploadModalOpen}
				onComplete={getUserData}
			/>
			<div
				className={cn(
					'w-full max-h-[200px] h-[15vh] md:h-[25vh] bg-linear-to-r from-gray-100 to-gray-200 rounded-xl',
					user?.bannerKey ? 'bg-cover bg-center' : 'bg-gray-100',
				)}
				style={{ backgroundImage: user?.bannerUrl ? `url(${user.bannerUrl})` : undefined }}
			>
				{AuthUser?.id === user?.id && (
					<Button
						type="button"
						size="icon"
						className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/50 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						onClick={uploadBanner}
					>
						<Edit2Icon className="size-4 text-white" />
					</Button>
				)}
			</div>
		</div>
	);
};

const UserPageBannerSkeleton = () => {
	return <Skeleton className="w-full max-h-[200px] h-[15vh] md:h-[25vh]" />;
};
