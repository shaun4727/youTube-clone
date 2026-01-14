'use client';

import { SidebarMenuButton } from '@/components/ui/sidebar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const SidebarLinkItem = ({ id, name }: { id: string; name: string }) => {
	const pathname = usePathname();
	const isActive = pathname === `/users/${id}`;

	return (
		<SidebarMenuButton tooltip={name} asChild isActive={isActive}>
			<Link href={`/users/${id}`} className="flex items-center gap-4">
				<span>{name}</span>
			</Link>
		</SidebarMenuButton>
	);
};
