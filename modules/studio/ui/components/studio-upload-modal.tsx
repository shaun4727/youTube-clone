'use client';

import { ResponsiveModal } from '@/components/responsive-modal';
import { Button } from '@/components/ui/button';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const StudioUploadModal = () => {
	const [loadingIcon, setLoadingIcon] = useState<boolean>(false);
	const timerRef = useRef<NodeJS.Timeout>(undefined);

	const createVideo = () => {
		setLoadingIcon(true);
	};

	useEffect(() => {
		if (loadingIcon === true) {
			timerRef.current = setTimeout(() => {
				setLoadingIcon(false);
				timerRef.current = undefined;
			}, 3000);
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [loadingIcon]);

	return (
		<>
			<ResponsiveModal title="Upload a video" open={!!false} onOpenChange={() => false}>
				{/* <StudioUploader /> */}
				<p>hello world</p>
			</ResponsiveModal>
			<Button variant="secondary" onClick={() => createVideo()}>
				{loadingIcon ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
				Create
			</Button>
		</>
	);
};
