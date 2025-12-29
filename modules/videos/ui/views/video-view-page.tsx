import { auth } from '@/auth';
import { CommentsSection } from '../sections/comment-section';
import { SuggestionsSection } from '../sections/suggestions-section';
import { VideoPageSection } from '../sections/video-section';

interface VideoViewPageProps {
	videoId: string;
}

const delay = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const VideoViewPage = async ({ videoId }: VideoViewPageProps) => {
	const session = await auth();
	const currUser = session?.user;

	// await delay(3000);

	const res = await fetch(`${process.env.CLIENT_ADDRESS}/api/video-page?id=${videoId}&userId=${currUser?.id}`, {
		method: 'GET',
		cache: 'no-store',
	});

	const result = await res.json();

	return (
		<div className="flex flex-col max-w-[1700px] mx-auto pt-2.5 px-4 mb-10">
			<div className="flex flex-col xl:flex-row gap-6">
				<div className="flex-1 min-w-0">
					<VideoPageSection singleVideo={result} />
					<div className="xl:hidden block mt-4">
						<SuggestionsSection videoId={videoId} />
					</div>
					<CommentsSection />
				</div>
				<div className="hidden xl:block w-full xl:w-[380px] 2xl:w-[460px] shrink">
					<SuggestionsSection videoId={videoId} />
				</div>
			</div>
		</div>
	);
};
