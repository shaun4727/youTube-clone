import { VideosView } from '@/modules/playlists/views/video-views';

interface PageProps {
	params: Promise<{ playlistId: string }>;
}

export const dynamic = 'force-dynamic';

const page = async ({ params }: PageProps) => {
	const { playlistId } = await params;

	return <VideosView playlistId={playlistId} />;
};

export default page;
