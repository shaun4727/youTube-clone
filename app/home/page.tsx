import { signOut } from '@/auth';
import { Button } from '@/components/ui/button';

const HomePage = () => {
	return (
		<div>
			Home page
			<form
				action={async (formData) => {
					'use server';
					await signOut({ redirectTo: '/sign-in' });
				}}
			>
				<Button type="submit">Sign Out</Button>
			</form>
		</div>
	);
};

export default HomePage;
