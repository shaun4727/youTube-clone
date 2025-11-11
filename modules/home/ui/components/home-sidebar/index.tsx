import { Separator } from '@/components/ui/separator';
import { Sidebar, SidebarContent } from '@/components/ui/sidebar';
import { MainSection } from './main-section';
import { PersonalSection } from './personal-section';

export const HomeSidebar = () => {
	return (
		<Sidebar className="mt-16.5" collapsible="icon">
			<SidebarContent className="bg-background">
				<MainSection />
				<Separator />
				<PersonalSection />
			</SidebarContent>
		</Sidebar>
	);
};
