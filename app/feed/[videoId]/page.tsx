const videoIdPage = async ({ params }: { params: Promise<{ videoId: string }> }) => {
	const vidId = await params;

	return <div>video id page {vidId.videoId}</div>;
};

export default videoIdPage;
