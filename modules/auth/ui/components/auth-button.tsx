'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCurrentUser } from '@/hooks/use-current-user';
import { signOutFromYoutube } from '@/lib/actions/loginLogoutActions';

import { ClapperboardIcon, LogOut, Settings, UserCircleIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const AuthButton = () => {
	const [user, setUser] = useState<ReturnType<typeof useCurrentUser>>(undefined);
	const data = useCurrentUser();

	useEffect(() => {
		setUser(data);
	}, [data]);

	const logOutFunc = () => {
		try {
			signOutFromYoutube();
			setUser(undefined);
		} catch (err) {
			console.log('auth-button comp --', err);
		}
	};

	console.log(user?.image);

	return (
		<>
			{user ? (
				<>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Avatar>
								<Image
									src={user?.image as string}
									alt="profile"
									width={32}
									height={32}
									className="rounded-full object-cover"
								/>
							</Avatar>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-auto">
							<DropdownMenuGroup>
								<DropdownMenuItem className="flex gap-2 text-regular-font-size p-[var(--regular-padding-left)] cursor-pointer">
									<div className="flex gap-2 ">
										<Avatar>
											<Image
												src={user?.image as string}
												alt="profile"
												width={32}
												height={32}
												className="rounded-full object-cover"
											/>
										</Avatar>
										<div>
											<h4 className="font-bold">{user?.name}</h4>
											<p>{user?.email}</p>
										</div>
									</div>
								</DropdownMenuItem>
								<DropdownMenuItem className="flex gap-2 text-regular-font-size p-[var(--regular-padding-left)] cursor-pointer">
									<Settings className="w-[var(--regular-icon-size)] " />
									Manage Account
								</DropdownMenuItem>
								<DropdownMenuItem
									className="flex gap-2 text-regular-font-size p-[var(--regular-padding-left)] cursor-pointer"
									asChild
								>
									<Link href="/studio">
										<ClapperboardIcon className="w-[var(--regular-icon-size)] " />
										Studio
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem
									className="flex gap-2 text-regular-font-size p-[var(--regular-padding-left)] cursor-pointer"
									onClick={() => logOutFunc()}
								>
									<LogOut className="w-[var(--regular-icon-size)] " />
									Sign out
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</>
			) : (
				<Link href="/sign-in">
					<Button
						variant="outline"
						className="px-4 py-2 text-sm font-medium text-blue-500 hover:text-blue-500 border-blue-500/20 rounded-full shadow-none"
					>
						<UserCircleIcon /> Sign In
					</Button>
				</Link>
			)}
		</>
	);
};

export default AuthButton;
