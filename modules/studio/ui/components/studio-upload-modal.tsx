'use client';

import { ResponsiveModal } from '@/components/responsive-modal';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

export const StudioUploadModal = () => {
	const [loadingIcon, setLoadingIcon] = useState<boolean>(false);
	// const timerRef = useRef<NodeJS.Timeout>(undefined);

	const data = useCurrentUser();

	const createVideoFunc = async () => {
		try {
			setLoadingIcon(true);
			const res = await fetch('/api/videos', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: 'untitled',
					description: 'A description',
					userId: data?.id,
				}),
			});

			await res.json();
			setLoadingIcon(false);
		} catch (err) {
			console.log(err);
		}
	};

	// const createVideo = () => {
	// 	setLoadingIcon(true);
	// };

	// useEffect(() => {
	// 	if (loadingIcon === true) {
	// 		timerRef.current = setTimeout(() => {
	// 			setLoadingIcon(false);
	// 			timerRef.current = undefined;
	// 		}, 3000);
	// 	}

	// 	return () => {
	// 		if (timerRef.current) {
	// 			clearTimeout(timerRef.current);
	// 		}
	// 	};
	// }, [loadingIcon]);

	return (
		<>
			<ResponsiveModal title="Upload a video" open={!!false} onOpenChange={() => false}>
				{/* <StudioUploader /> */}
				<p>hello world</p>
			</ResponsiveModal>
			<Button variant="secondary" onClick={() => createVideoFunc()} disabled={loadingIcon}>
				{loadingIcon ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
				Create
			</Button>
		</>
	);
};
