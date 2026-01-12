import { SidebarHeader, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthUI } from '@/context/user-context';
import Image from 'next/image';
import Link from 'next/link';

export const StudioSidebarHeader = () => {
	const { userInfo } = useAuthUI();

	const { state } = useSidebar();

	if (!userInfo)
		return (
			<SidebarHeader className="flex items-center justify-center pb-4">
				<Skeleton className="h-4 w-20" />
				<div className="flex flex-col items-center mt-2">
					<Skeleton className="h-4 w-20 gap-y-1" />
					<Skeleton className="h-4 w-25" />
				</div>
			</SidebarHeader>
		);

	if (state === 'collapsed') {
		return (
			<SidebarMenuItem>
				<SidebarMenuButton tooltip="Your profile" asChild>
					<Link href="/users/current">
						{/* <UserAvatar
							imageUrl={user?.image || ('' as string)}
							name={user?.name ?? ('User' as string)}
							size="sm"
						/> */}
					</Link>
				</SidebarMenuButton>
			</SidebarMenuItem>
		);
	}

	return (
		<SidebarHeader className="flex items-center justify-center pb-4">
			<Link href="/users/current">
				{userInfo && userInfo.image && (
					<Image
						src={userInfo.image}
						alt="avatar"
						width="110"
						height="110"
						loading="eager"
						className="rounded-full aspect-square hover:opacity-80 transition-opacity"
					/>
				)}
			</Link>
			<div>
				<p className="text-sm font-medium">Your profile</p>
				<p className="text-xs text-muted-foreground">{userInfo?.name || ''}</p>
			</div>
		</SidebarHeader>
	);
};
