import { auth } from '@/auth';
import { VideoPageSection } from '../sections/video-section';

interface VideoViewPageProps {
	videoId: string;
}

export const VideoViewPage = async ({ videoId }: VideoViewPageProps) => {
	const session = await auth();
	const currUser = session?.user;

	const res = await fetch(`${process.env.CLIENT_ADDRESS}/api/video-page?id=${videoId}&userId=${currUser?.id}`, {
		method: 'GET',
		cache: 'no-store',
	});

	const result = await res.json();

	return (
		<div className="flex flex-col max-w-[1700px] mx-auto pt-2.5 px-4 mb-10">
			id: {videoId}
			<div className="flex flex-col xl:flex-row gap-6">
				<div className="flex-1 min-w-0">
					<VideoPageSection singleVideo={result} />
				</div>
			</div>
		</div>
	);
};
