'use client';

import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { ListIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AllSubscriptionsSidebar = () => {
	const pathname = usePathname();

	return (
		<SidebarMenuItem>
			<SidebarMenuButton asChild isActive={pathname === '/subscriptions'}>
				<Link href="/subscriptions" className="flex items-center gap-4">
					<ListIcon className="size-4" />
					<span className="text-sm">All subscriptions</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
};
