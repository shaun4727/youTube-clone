'use client';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCurrentUser } from '@/hooks/use-current-user';
import { VideoSchemaZod } from '@/schema';
import { SingleVideoType } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { CopyCheckIcon, CopyIcon, Globe2Icon, LockIcon, MoreVerticalIcon, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { snakeCaseToTitle } from '@/lib/utils';
import Link from 'next/link';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import * as z from 'zod';
import { VideoPlayer } from '../components/video-player';

export const FormSection = ({ video, fullUrl }: { video: { studioVideo: SingleVideoType }; fullUrl: string }) => {
	const [categories, setCategories] = useState<{ value: string; label: string }[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isCopied, setIsCopied] = useState(true);

	const currUser = useCurrentUser();
	const router = useRouter();

	async function loadCategories() {
		try {
			const res = await fetch('/api/categories');
			const data = await res.json();

			// Transform into the shape FilterCarousel expects
			const formatted = data.map((c: any) => ({
				value: c.id,
				label: c.name,
			}));

			setCategories(formatted);
		} finally {
			setIsLoading(false);
		}
	}
	useEffect(() => {
		loadCategories();
	}, []);

	const form = useForm<z.infer<typeof VideoSchemaZod>>({
		resolver: zodResolver(VideoSchemaZod),
		defaultValues: {
			name: video?.studioVideo?.name,
			description: video?.studioVideo?.description,
			categoryId: video?.studioVideo?.categoryId || 'cmiy4hddw00005td6cgc6fvxd',
			visibility: video?.studioVideo?.visibility,
		},
	});

	const onSubmit = async (data: z.infer<typeof VideoSchemaZod>) => {
		try {
			let toastId: string | number = '1';
			const formPayload = {
				userId: currUser?.id,
				name: data.name,
				description: data.description,
				category_id: data.categoryId,
				visibility: data.visibility,
				videoId: video.studioVideo.id,
			};

			const res = await fetch('/api/videos', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formPayload),
			});

			if (res.status == 200) {
				toastId = toast.success('Video updated successfully!', { id: toastId });
			} else {
				toast.error('Video update failed!', { id: toastId });
			}
		} catch (err) {
			console.log(err);
		}
	};

	const deleteVideoFunc = async () => {
		try {
			let toastId: number | string = 1;
			const payload = {
				id: video?.studioVideo?.id,
				userId: currUser?.id,
			};
			const res = await fetch('/api/videos', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			});

			if (res.status == 200) {
				toastId = toast.success('Video deleted successfully!', { id: toastId });
				router.push('/studio');
			} else {
				toast.error('Video deletion failed!', { id: toastId });
			}
		} catch (err) {
			console.log(err);
		}
	};

	const onCopy = async () => {
		await navigator.clipboard.writeText(fullUrl);
		setIsCopied(true);

		setTimeout(() => {
			setIsCopied(false);
		}, 2000);
	};

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="flex items-center justify-between mb-6">
						<div>
							<h1 className="text-2xl font-bold">Video Details</h1>
							<p className="text-xs text-muted-foreground">Manage your video details</p>
						</div>

						<div className="flex items-center gap-x-2">
							<Button type="submit" disabled={false}>
								Save
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button variant="ghost" size="icon">
										<MoreVerticalIcon />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent align="end">
									<DropdownMenuItem onClick={() => deleteVideoFunc()}>
										<TrashIcon className="size-4 mr-2" />
										Delete
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</div>
					</div>
					<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
						<div className="space-y-8 lg:col-span-3">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>
											Title
											{/* TODO: add AI generate button */}
										</FormLabel>
										<FormControl>
											<Input {...field} placeholder="Add a title to your video" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormControl>
											<Textarea
												{...field}
												value={field.value ?? ''}
												rows={10}
												className="resize-none pr-10"
												placeholder="Add a title to your video"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* Add thumbnail field here */}
							<FormField
								control={form.control}
								name="categoryId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Category</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select a category" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{categories &&
													categories.map((c) => (
														<SelectItem key={c.value} value={c.value}>
															{c.label}
														</SelectItem>
													))}
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className="flex flex-col gap-y-8 lg:col-span-2">
							<div className="flex flex-col gap-4 bg-[#f9f9f9] rounded-xl overflow-hidden h-fit">
								<div className="aspect-video overflow-hidden relative">
									<VideoPlayer
										playbackId={video.studioVideo.muxPlaybackId}
										thumbnailUrl={video.studioVideo.thumbnailUrl}
									/>
								</div>
								<div className="px-4 flex flex-col gap-y-6 w-full">
									<div className="flex justify-between items-center gap-x-2">
										<div className="flex flex-col gap-y-1">
											<div className="flex items-center gap-x-2 flex-wrap cursor-pointer">
												<Link href={`/videos/${video.studioVideo.id}`}>
													<p className="line-clamp-1 text-sm text-blue-500 truncate w-76">
														{fullUrl}
													</p>
												</Link>
												<Button
													type="button"
													variant="ghost"
													size="icon"
													className="shrink-0 cursor-pointer"
													onClick={onCopy}
													disabled={isCopied}
												>
													{isCopied ? <CopyCheckIcon /> : <CopyIcon />}
												</Button>
											</div>
										</div>
									</div>
									<div className="flex justify-between items-center">
										<div className="flex flex-col gap-y-1">
											<p className="text-muted-foreground text-xs">Video Status</p>
											<p className="text-sm">
												{snakeCaseToTitle(video.studioVideo.muxStatus || 'preparing')}
											</p>
										</div>
									</div>

									<div className="flex justify-between items-center">
										<p className="text-muted-foreground text-xs">Subtitles status</p>
										<p className="text-sm">
											{snakeCaseToTitle(video.studioVideo.muxTrackStatus) || 'No Subtitles'}
										</p>
									</div>
								</div>
							</div>
							<FormField
								control={form.control}
								name="visibility"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Visibility</FormLabel>
										<Select onValueChange={field.onChange} defaultValue={field.value ?? undefined}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select visibility" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="PUBLIC">
													{' '}
													<Globe2Icon className="size-4 mr-2" /> PUBLIC
												</SelectItem>
												<SelectItem value="PRIVATE">
													<LockIcon className="size-4 mr-2" /> PRIVATE
												</SelectItem>
											</SelectContent>
										</Select>

										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</div>
				</form>
			</Form>
		</>
	);
};
