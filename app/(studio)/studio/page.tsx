import { auth } from '@/auth';
import { StudioView } from '@/modules/studio/ui/view/studio-view';

const page = async () => {
	const session = await auth();
	const user = session?.user;

	return (
		<div>
			<StudioView />
		</div>
	);
};

export default page;
