'use client';

import { ResponsiveModal } from '@/components/responsive-modal';
import { Button } from '@/components/ui/button';
import { useCurrentUser } from '@/hooks/use-current-user';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { StudioUploader } from './studio-uploader';

export const StudioUploadModal = () => {
	const [loadingIcon, setLoadingIcon] = useState<boolean>(false);
	const [openDrawer, setOpenDrawer] = useState<boolean>(false);
	const [videoData, setVideoData] = useState<{
		video: {
			id: string;
			name: string;
		};
		url: string;
	}>();
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

			openDrawerFunc();
			const result = await res.json();
			setVideoData(result);
		} catch (err) {
			console.log(err);
		} finally {
			setLoadingIcon(false);
		}
	};

	const openDrawerFunc = () => {
		setOpenDrawer((prevStatus) => !prevStatus);
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
			{/* open={ !!videoData.url} */}
			<ResponsiveModal title="Upload a video" open={openDrawer} onOpenChange={() => openDrawerFunc()}>
				{videoData && videoData.url ? (
					<StudioUploader endpoint={videoData.url} onSuccess={() => console.log('')} />
				) : (
					<Loader2Icon />
				)}
				{/* <p>hello world</p> */}
			</ResponsiveModal>
			<Button variant="secondary" onClick={() => createVideoFunc()} disabled={loadingIcon}>
				{loadingIcon ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
				Create
			</Button>
			{/* <Button variant="secondary" onClick={() => createVideoFunc()} disabled={loadingIcon}>
				{loadingIcon ? <Loader2Icon className="animate-spin" /> : <PlusIcon />}
				Create
			</Button> */}
		</>
	);
};
