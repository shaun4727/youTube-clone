'use client';

import { useEffect, useRef } from 'react';
import { Badge } from './ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

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
	const contentRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const el = contentRef.current;
		if (!el) return;

		const onWheel = (e: WheelEvent) => {
			if (Math.abs(e.deltaY) > 0) {
				e.preventDefault();
				el.scrollLeft += e.deltaY; // Convert vertical wheel to horizontal scroll
			}
		};

		el.addEventListener('wheel', onWheel, { passive: false });
		return () => el.removeEventListener('wheel', onWheel);
	}, []);

	return (
		<div className="relative w-full">
			<Carousel opts={{ align: 'start', dragFree: true }} className="w-full px-12">
				<CarouselContent ref={contentRef} className="-ml-3 flex items-center  no-scrollbar snap-x">
					{/* className="-ml-3 overflow-x-auto flex items-center  no-scrollbar snap-x" */}
					<CarouselItem key="all" className="pl-3 basis-auto snap-start">
						<Badge
							variant={value === null ? 'default' : 'secondary'}
							className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
						>
							All
						</Badge>
					</CarouselItem>

					{data?.map((item) => (
						<CarouselItem key={item.value} className="pl-3 basis-auto snap-start">
							<Badge
								variant={value === item.value ? 'default' : 'secondary'}
								className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
							>
								{item.label}
							</Badge>
						</CarouselItem>
					))}

					{isLoading &&
						Array.from({ length: 5 }).map((_, i) => (
							<CarouselItem
								key={`skeleton-${i}`}
								className="pl-3 basis-auto flex items-center snap-start"
							>
								<div className="h-7 w-16 bg-muted animate-pulse rounded-lg" />
							</CarouselItem>
						))}
				</CarouselContent>

				<CarouselPrevious className="left-0 z-20 pointer-events-auto" />
				<CarouselNext className="right-0 z-20 pointer-events-auto" />
			</Carousel>
		</div>
	);
};
