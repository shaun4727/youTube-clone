// @/modules/videos/ui/skeleton/vidoe-view-page-skeleton.tsx

import { Skeleton } from '@/components/ui/skeleton';

// IMPORTANT: Do NOT import VideoTopRow or VideoDescription here.
// Only use the Skeleton versions which are simple HTML/Tailwind.

export const VideoViewLoading = () => {
	return (
		<div className="flex flex-col max-w-[1700px] mx-auto pt-2.5 px-4 mb-10">
			<div className="flex flex-col xl:flex-row gap-6">
				<div className="flex-1 min-w-0">
					{/* Use the RAW skeleton logic here, don't import the Client Component */}
					<div className="aspect-video bg-muted animate-pulse rounded-xl" />

					<div className="flex flex-col gap-4 mt-4">
						<Skeleton className="h-6 w-2/5" />
						<div className="flex items-center gap-3">
							<Skeleton className="h-10 w-10 rounded-full" />
							<Skeleton className="h-5 w-1/5" />
						</div>
						{/* This represents the VideoDescription area */}
						<Skeleton className="h-24 w-full mt-2" />
						<Skeleton className="h-36 w-full mt-2" />
					</div>
				</div>

				{/* Sidebar area */}
				<div className="hidden xl:block w-[380px]">
					{[...Array(4)].map((_, i) => (
						<div key={i} className="flex gap-2 mb-4">
							<Skeleton className="h-20 w-32 rounded-lg" />
							<div className="space-y-2">
								<Skeleton className="h-4 w-32" />
								<Skeleton className="h-3 w-20" />
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
