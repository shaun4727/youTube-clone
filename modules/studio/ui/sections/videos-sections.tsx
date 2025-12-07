'use client';

import { InfiniteScroll } from '@/components/infinite-scroll';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { VideoType } from '@/types';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export const VideosSection = ({ videos }: VideoType) => {
	const [loadingButton, setLoadingButton] = useState<boolean>(false);
	const timerRef = useRef<NodeJS.Timeout>(undefined);

	const router = useRouter();

	const isLoadingTime = () => {
		setLoadingButton(true);
		setTimeout(() => {
			setLoadingButton(false);
		}, 3000);
	};

	useEffect(() => {
		if (loadingButton === true) {
			timerRef.current = setTimeout(() => {
				setLoadingButton(false);
				timerRef.current = undefined;
			}, 3000);
		}

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [loadingButton]);

	console.log('videos ', videos);

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
						{[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => (
							<TableRow
								key={item}
								className="cursor-pointer"
								onClick={() => router.push(`/studio/videos/1`)}
							>
								<TableCell>{item}</TableCell>
								<TableCell>{item}</TableCell>
								<TableCell>{item}</TableCell>
								<TableCell>{item}</TableCell>
								<TableCell className="text-center pl-6">{item}</TableCell>
								<TableCell className="text-center pl-6">{item}</TableCell>
								<TableCell className="text-center pl-6">{item}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>

			<InfiniteScroll
				isManual={true}
				hasNextPage={true}
				isFetchingNextPage={loadingButton}
				fetchNextPage={isLoadingTime}
			/>
		</div>
	);
};
