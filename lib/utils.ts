import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const formatDuration = (duration: number) => {
	const seconds = Math.floor(duration % 60000);
	const minutes = Math.floor(duration / 60000);

	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const snakeCaseToTitle = (str: string) => {
	if (!str) {
		return 'Error';
	}
	let snake = str
		.replace(/([A-Z])/g, (match, p1) => `_${p1}`) // Example: 'aB' -> 'a_B'
		.replace(/[\s-]+/g, '_');

	snake = snake
		.toLowerCase()
		.replace(/^_+|_+$/g, '')
		.replace(/_{2,}/g, '_');

	return snake
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('_');
};
