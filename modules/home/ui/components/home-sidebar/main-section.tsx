'use client';

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import { mainSectionItems } from '@/route';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const MainSection = () => {
	const pathname = usePathname();
	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					{mainSectionItems.map((item) => (
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
