import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa';

export const LoginForm = () => {
	return (
		<Card className="w-full max-w-md pb-0 ">
			<CardContent className="pt-[50px]">
				<CardTitle className="flex gap-4 items-center justify-center">
					Sign In to{' '}
					<span className="flex items-center gap-1">
						<Image width={32} height={32} src="/logo/logo.svg" alt="clone-logo" />
						YouTube Clone
					</span>
				</CardTitle>
				<CardDescription className="text-center">Welcome back! Please Sign In to continue</CardDescription>
				<Button variant="outline" className="w-full mt-[40px]">
					<FaGoogle />
					Continue with Google
				</Button>
			</CardContent>
			<div className="bg-[var(--custom-muted-background)] h-[80px] flex items-center rounded-b-xl mt-10">
				<h4 className="text-center w-full text-regular-font-size">
					<span className="text-muted-foreground">Developed by</span> <b>NaiveScripter</b>
				</h4>
			</div>
		</Card>
	);
};
