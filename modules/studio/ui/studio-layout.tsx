import React from 'react';

import { Separator } from '@/components/ui/separator';
import { SidebarProvider } from '@/components/ui/sidebar';
import { StudioNavbar } from './components/studio-navbar';
import { StudioSidebar } from './components/studio-sidebar';

export const StudioLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SidebarProvider>
			<div className="w-full">
				<StudioNavbar />
				<Separator />
				<div className="flex min-h-screen mt-16px ">
					<StudioSidebar />
					<main className="flex-1 overflow-y-auto">{children}</main>
				</div>
			</div>
		</SidebarProvider>
	);
};
