'use client';

import { InfiniteScroll } from '@/components/infinite-scroll';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCurrentUser } from '@/hooks/use-current-user';
import { VideoType } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
			const count = (offset + 1) * 6;
			const res = await fetch(`/api/videos?id=${data?.id}&offset=${count}`, {
				method: 'GET',
			});
			setLoadingState(false);

			const result = await res.json();
			setStudioVid((prevRes) => {
				if (!prevRes.studioVideosWithLimit.length) {
					return result;
				}

				return {
					studioVideosWithLimit: [...prevRes.studioVideosWithLimit, ...result.studioVideosWithLimit],
					hasNextPage: prevRes.hasNextPage,
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
								onClick={() => router.push(`/studio/videos/1`)}
							>
								<TableCell>{item.id}</TableCell>
								<TableCell>Static Video</TableCell>
								<TableCell>static Visibility</TableCell>
								<TableCell>Static Date</TableCell>
								<TableCell className="text-center pl-6">Static Views</TableCell>
								<TableCell className="text-center pl-6">Static Comments</TableCell>
								<TableCell className="text-center pl-6">Static Likes</TableCell>
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
	);
};
