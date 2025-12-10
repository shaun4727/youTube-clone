import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from './ui/drawer';

interface ResponsiveModalProps {
	children: React.ReactNode;
	open: boolean;
	title: string;
	onOpenChange: (open: boolean) => void;
}

export const ResponsiveModal = ({ title, children, open, onOpenChange }: ResponsiveModalProps) => {
	const isMobile = useIsMobile();

	if (isMobile) {
		return (
			<Drawer>
				<DrawerContent>
					<DrawerHeader>
						<DrawerTitle>{title}</DrawerTitle>
					</DrawerHeader>
					{children}
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};
