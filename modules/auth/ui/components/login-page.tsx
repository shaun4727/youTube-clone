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
			</Link>
		</Card>
	);
};
