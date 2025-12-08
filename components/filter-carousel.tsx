'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { Badge } from './ui/badge';
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';

interface FilterCarouselProps {
	value?: string | null;
	isLoading: boolean;
	onSelect: (value: string | null) => void;
	data: {
		value: string;
		label: string;
	}[];
}

export const FilterCarousel = ({ value, onSelect, data, isLoading }: FilterCarouselProps) => {
	const contentRef = useRef<HTMLDivElement | null>(null);
	const [api, setApi] = useState<CarouselApi>();
	const [current, setCurrent] = useState(0);
	const [count, setCount] = useState(0);

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

	useEffect(() => {
		if (!api) {
			return;
		}

		setCount(api.scrollSnapList().length);
		setCurrent(api.selectedScrollSnap() + 1);

		api.on('select', () => {
			setCurrent(api.selectedScrollSnap() + 1);
		});
	}, [api]);

	return (
		<div className="relative w-full">
			{/* --------- left fade  */}
			<div
				className={cn(
					'absolute left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none',
					current === 1 && 'hidden',
				)}
			/>
			<Carousel setApi={setApi} opts={{ align: 'start', dragFree: true }} className="w-full px-12">
				<CarouselContent ref={contentRef} className="-ml-3 mb-3 flex items-center  no-scrollbar snap-x">
					{/* className="-ml-3 overflow-x-auto flex items-center  no-scrollbar snap-x" */}

					{!isLoading && (
						<CarouselItem onClick={() => onSelect?.(null)} key="all" className="pl-3 basis-auto snap-start">
							<Badge
								variant={value === null ? 'default' : 'secondary'}
								className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
							>
								All
							</Badge>
						</CarouselItem>
					)}

					{!isLoading &&
						data?.map((item) => (
							<CarouselItem
								key={item.value}
								className="pl-3 basis-auto snap-start"
								onClick={() => onSelect(item.value)}
							>
								<Badge
									variant={value === item.value ? 'default' : 'secondary'}
									className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
								>
									{item.label}
								</Badge>
							</CarouselItem>
						))}

					{isLoading &&
						Array.from({ length: 14 }).map((_, i) => (
							<CarouselItem
								key={`skeleton-${i}`}
								className="pl-3 basis-auto flex items-center snap-start"
							>
								<div className="h-7 w-16 bg-muted animate-pulse rounded-lg" />
							</CarouselItem>
						))}
				</CarouselContent>

				<CarouselPrevious className="left-0 top-4 z-20 pointer-events-auto" />
				<CarouselNext className="right-0 top-4 z-20 pointer-events-auto" />
			</Carousel>

			{/* --------- right fade  */}
			<div
				className={cn(
					'absolute right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none',
					current === count && 'hidden',
				)}
			/>
		</div>
	);
};
