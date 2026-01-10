import { HistoryView } from '@/modules/playlists/views/history-view';

export const dynamic = 'force-dynamic';
const page = () => {
	return (
		<div>
			<HistoryView />
		</div>
	);
};

export default page;
