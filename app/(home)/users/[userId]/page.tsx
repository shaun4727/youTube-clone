import { UserView } from '@/modules/users/ui/views/user-view';

const page = async ({ params }: { params: Promise<{ userId: string }> }) => {
	const { userId } = await params;

	return (
		<div>
			<UserView userId={userId} />
		</div>
	);
};

export default page;
