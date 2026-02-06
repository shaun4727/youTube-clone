'use client';

import { InfiniteScroll } from '@/components/infinite-scroll';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCurrentUser } from '@/hooks/use-current-user';
import { snakeCaseToTitle } from '@/lib/utils';
import { VideoThumbnail } from '@/modules/videos/ui/components/video-thumbnail';
import { VideoType } from '@/types';
import { VideoVisibility } from '@prisma/client';
import { format } from 'date-fns';
import { Globe2Icon, LockIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const VideosSectionSkeleton = () => {
	return (
		<>
			<div className="border-y">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="pl-6 w-[510px]">Video</TableHead>
							<TableHead>Visibility</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Date</TableHead>
							<TableHead className="text-right">Views</TableHead>
							<TableHead className="text-right">Comments</TableHead>
							<TableHead className="text-right pr-6">Likes</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: 5 }).map((_, index) => (
							<TableRow key={index}>
								<TableCell className="pl-6">
									<div className="flex items-center gap-4">
										<Skeleton className="h-20 w-36" />
										<div className="flex flex-col gap-2">
											<Skeleton className="h-4 w-[100px]" />
											<Skeleton className="h-3 w-[100px]" />
										</div>
									</div>
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-20" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-16" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-4 w-24" />
								</TableCell>
								<TableCell className="text-right">
									<Skeleton className="h-4 w-12 ml-auto" />
								</TableCell>
								<TableCell className="text-right">
									<Skeleton className="h-4 w-12 ml-auto" />
								</TableCell>
								<TableCell className="text-right">
									<Skeleton className="h-4 w-12 ml-auto" />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

export const VideosSection = () => {
	const [loadingState, setLoadingState] = useState<boolean>(false);
	const [studioVid, setStudioVid] = useState<VideoType>({ studioVideosWithLimit: [], hasNextPage: false });
	const [offset, setOffset] = useState<number>(-1);
	// const timerRef = useRef<NodeJS.Timeout>(undefined);

	const router = useRouter();
	const data = useCurrentUser();

	const getVideoFunc = async () => {
		try {
			setLoadingState(true);

			setOffset(offset + 1);
			const count = (offset + 1) * 5;
			const res = await fetch(`/api/videos?id=${data?.id}&offset=${count}`, {
				method: 'GET',
			});
			setLoadingState(false);

			const result = await res.json();
			console.log('studio ', result);
			setStudioVid((prevRes) => {
				if (!prevRes.studioVideosWithLimit.length) {
					return result;
				}

				return {
					studioVideosWithLimit: [...prevRes.studioVideosWithLimit, ...result.studioVideosWithLimit],
					hasNextPage: result.hasNextPage,
				};
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getVideoFunc();

		return () => {
			setStudioVid({
				hasNextPage: false,
				studioVideosWithLimit: [],
			});
		};
	}, []);

	// const isLoadingTime = () => {
	// 	setLoadingButton(true);
	// 	setTimeout(() => {
	// 		setLoadingButton(false);
	// 	}, 3000);
	// };

	// useEffect(() => {
	// 	if (loadingButton === true) {
	// 		timerRef.current = setTimeout(() => {
	// 			setLoadingButton(false);
	// 			timerRef.current = undefined;
	// 		}, 3000);
	// 	}

	// 	return () => {
	// 		if (timerRef.current) {
	// 			clearTimeout(timerRef.current);
	// 		}
	// 	};
	// }, [loadingButton]);

	return (
		<>
			{loadingState ? (
				<VideosSectionSkeleton />
			) : (
				<div>
					<div className="border-y">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="pl-6 w-[510px]">Video</TableHead>
									<TableHead>Visibility</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Date</TableHead>
									<TableHead className="text-right">Views</TableHead>
									<TableHead className="text-right">Comments</TableHead>
									<TableHead className="text-right pr-6">Likes</TableHead>
								</TableRow>
							</TableHeader>

							<TableBody>
								{studioVid.studioVideosWithLimit.map((item) => (
									<TableRow
										key={item.id}
										className="cursor-pointer"
										onClick={() => router.push(`/studio/videos/${item.id}`)}
									>
										<TableCell>
											<div className="flex items-center gap-4">
												<div className="relative aspect-video w-36 shrink-0">
													<VideoThumbnail
														imageUrl={item.thumbnailUrl}
														previewUrl={item.previewUrl}
														title={item.name}
														duration={item.duration}
													/>
												</div>
												<div className="flex flex-col overflow-hidden gap-y-1">
													{/* The Tailwind CSS utility class line-clamp-1 is used to truncate (cut off) multi-line text after the first line and then display an ellipsis (...) at the end of that line, indicating that there is more content hidden. */}
													<span className="text-sm line-clamp-1">{item.name}</span>
													<span className="text-xs text-muted-foreground line-clamp-1">
														{item.description || 'No description'}
													</span>
												</div>
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center">
												{item.visibility == VideoVisibility.PRIVATE ? (
													<LockIcon className="size-4 mr-2" />
												) : (
													<Globe2Icon className="size-4 mr-2" />
												)}
												{snakeCaseToTitle(item.visibility)}
											</div>
										</TableCell>
										<TableCell>
											<div className="flex items-center">{snakeCaseToTitle(item.muxStatus)}</div>
										</TableCell>
										<TableCell className="text-sm truncate">
											{format(new Date(item.createdAt), 'd MMM yyyy')}
										</TableCell>
										<TableCell className="text-right">
											<span className="w-12 ml-auto">{item._count.videoViews || 0}</span>
										</TableCell>
										<TableCell className="text-right">
											<span className="w-12 ml-auto">{item._count.VideoCommented || 0}</span>
										</TableCell>
										<TableCell className="text-center">
											<span className="w-12 ml-auto">{item.likeCount || 0}</span>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

					<InfiniteScroll
						isManual={true}
						hasNextPage={studioVid.hasNextPage}
						isFetchingNextPage={loadingState}
						fetchNextPage={getVideoFunc}
					/>
				</div>
			)}
		</>
	);
};
