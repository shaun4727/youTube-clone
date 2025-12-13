import { FormSection } from '../sections/form-section';

interface PageProps {
	videoId: string;
}

const delay = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

export const VideoView = async ({ videoId }: PageProps) => {
	await delay(3000);

	const res = await fetch(`${process.env.CLIENT_ADDRESS}/api/video?id=${videoId}`, {
		method: 'GET',
		cache: 'no-store',
	});

	const result = await res.json();
	const fullUrl = `${process.env.CLIENT_ADDRESS}/videos/${result.studioVideo.id}`;

	return (
		<div className="px-4 pt-2.5 max-w-5xl">
			<FormSection video={result} fullUrl={fullUrl} />
		</div>
	);
};
