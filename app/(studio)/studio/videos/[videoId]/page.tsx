import { VideoView } from '@/modules/studio/ui/view/video-view';
import { Suspense } from 'react';

export const dynamic = 'force-dynamic';

interface PageProps {
	params: Promise<{ videoId: string }>;
}

const page = async ({ params }: PageProps) => {
	const { videoId } = await params;
	return (
		<div>
			<Suspense fallback={<p>Loading in suspense....</p>}>
				<VideoView videoId={videoId} />
			</Suspense>
		</div>
	);
};

export default page;
