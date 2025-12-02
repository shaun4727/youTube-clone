'use client';

import { Badge } from './ui/badge';
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel';

interface FilterCarouselProps {
	value?: string | null;
	isLoading: boolean;
	onSelect?: (value: string | null) => void;
	data: {
		value: string;
		label: string;
	}[];
}

export const FilterCarousel = ({ value, onSelect, data, isLoading }: FilterCarouselProps) => {
	return (
		<div className="relative w-full">
			<Carousel opts={{ align: 'start', dragFree: true }} className="w-full px-12">
				<CarouselContent className="-ml-3 flex items-center">
					{/* ALL option */}
					<CarouselItem key="all">
						<Badge
							onClick={() => onSelect?.(null)}
							variant={value === null ? 'default' : 'secondary'}
							className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
						>
							All
						</Badge>
					</CarouselItem>

					{/* Loading skeleton */}
					{isLoading &&
						Array.from({ length: 5 }).map((_, i) => (
							<CarouselItem key={`skeleton-${i}`} className="flex items-center">
								<div className="h-7 w-16 bg-muted animate-pulse rounded-lg" />
							</CarouselItem>
						))}

					{/* Real items */}
					{!isLoading &&
						data.map((item) => (
							<CarouselItem key={item.value}>
								<Badge
									onClick={() => onSelect?.(item.value)}
									variant={value === item.value ? 'default' : 'secondary'}
									className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
								>
									{item.label}
								</Badge>
							</CarouselItem>
						))}
				</CarouselContent>
			</Carousel>
		</div>
	);
};
