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
			<Suspense fallback={<p>Loading in suspense....</p>}>
				<VideoViewPage videoId={videoId} />
			</Suspense>
		</div>
	);
};

export default page;
