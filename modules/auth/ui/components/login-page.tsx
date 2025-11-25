import { signIn } from '@/auth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

export const LoginForm = () => {
	return (
		<Card className="w-1/2 bg-[#dcdcdc]">
			<Link href="/">
				<div className="p-4 flex items-center gap-1">
					<Image width={32} height={32} src="/logo/logo.svg" alt="clone-logo" />
					<p>YouTube Clone </p>
				</div>
				<h1 className="text-3xl">Sign UP</h1>
			</Link>
			<form
				action={async () => {
					'use server';
					await signIn('google');
				}}
			>
				<Button className="text-3xl">Sign UP</Button>
			</form>
		</Card>
	);
};
