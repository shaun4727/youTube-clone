import { StudioLayout } from '@/modules/studio/ui/studio-layout';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<StudioLayout>{children}</StudioLayout>
		</div>
	);
};

export default Layout;
