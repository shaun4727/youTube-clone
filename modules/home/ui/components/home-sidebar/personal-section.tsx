'use client';

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { personalItems } from '@/route';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const PersonalSection = () => {
	const pathname = usePathname();
	return (
		<SidebarGroup>
			<SidebarGroupLabel>You</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{personalItems.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton
								tooltip={item.title}
								asChild
								isActive={pathname === item.url}
								onClick={() => {}}
							>
								<Link href={item.url} className="flex items-center gap-4">
									<item.icon />
									<span>{item.title}</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
