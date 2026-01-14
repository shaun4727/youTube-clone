import { auth } from '@/auth'; // Path to your NextAuth config
import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuItem,
} from '@/components/ui/sidebar';
import prisma from '@/lib/db';
import { SubscriptionWithCreator } from '@/types';
import { SidebarLinkItem } from './sidebar-link-item'; // We will create this

export const SubscriptionsSection = async () => {
	// 1. Get the session on the server
	const session = await auth();
	const userId = session?.user?.id;

	if (!userId) return null;

	// 2. Fetch data directly from Prisma
	const subscriptions = await prisma.subscription.findMany({
		where: { viewerId: userId },
		take: 5, // Your limit
		include: {
			creator: {
				select: {
					id: true,
					name: true,
					image: true,
				},
			},
		},
		orderBy: { createdAt: 'desc' },
	});

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Subscriptions</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{subscriptions.map((item: SubscriptionWithCreator) => (
						<SidebarMenuItem key={item.creatorId}>
							{/* We use a small client component for the Link to handle "isActive" */}
							<SidebarLinkItem id={item?.creator?.id || ''} name={item?.creator?.name || ''} />
						</SidebarMenuItem>
					))}
					{/* You can add a "Show More" link here that points to a full page */}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
