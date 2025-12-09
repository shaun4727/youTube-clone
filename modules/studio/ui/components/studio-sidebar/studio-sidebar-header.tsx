import { SidebarHeader, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useCurrentUser } from '@/hooks/use-current-user';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const StudioSidebarHeader = () => {
	const [user, setUser] = useState<ReturnType<typeof useCurrentUser>>(undefined);
	const data = useCurrentUser();

	const { state } = useSidebar();

	if (!data)
		return (
			<SidebarHeader className="flex items-center justify-center pb-4">
				<Skeleton className="h-4 w-20" />
				<div className="flex flex-col items-center mt-2">
					<Skeleton className="h-4 w-20 gap-y-1" />
					<Skeleton className="h-4 w-25" />
				</div>
			</SidebarHeader>
		);

	useEffect(() => {
		setUser(data);
	}, [data]);

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
				{user && user.image && (
					<Image
						src={user.image}
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
				<p className="text-xs text-muted-foreground">{user?.name || ''}</p>
			</div>
		</SidebarHeader>
	);
};
