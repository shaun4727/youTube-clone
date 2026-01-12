import { auth } from '@/auth';
import { getUserById } from '@/data/user';
import { redirect } from 'next/navigation';

export const GET = async () => {
	const userInfo = await auth();

	if (!userInfo?.user?.id) {
		return redirect('/sign-in');
	}

	const existingUser = await getUserById(userInfo?.user?.id);

	if (!existingUser) {
		return redirect('/sign-in');
	}

	return redirect(`/users/${existingUser.id}`);
};
