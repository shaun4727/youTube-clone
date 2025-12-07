import { auth } from '@/auth';
import { getStudioFiles } from '@/data/videos';
import { StudioView } from '@/modules/studio/ui/view/studio-view';

const page = async () => {
	const session = await auth();
	const user = session?.user;

	const studioFiles = await getStudioFiles(user?.id as string);

	return (
		<div>
			<StudioView videos={studioFiles} />
		</div>
	);
};

export default page;
