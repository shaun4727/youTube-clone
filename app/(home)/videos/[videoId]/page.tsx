import { VideoViewLoading } from '@/modules/videos/ui/skeleton/vidoe-view-page-skeleton';
import { VideoViewPage } from '@/modules/videos/ui/views/video-view-page';
import { Suspense } from 'react';

interface PageProps {
	params: Promise<{
		videoId: string;
	}>;
}

const page = async ({ params }: PageProps) => {
	const { videoId } = await params;
	return (
		<div>
			<Suspense fallback={<VideoViewLoading />}>
				<VideoViewPage videoId={videoId} />
			</Suspense>
		</div>
	);
};

export default page;
