import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Formats a duration in milliseconds into HH:MM:SS or MM:SS format.
 * @param duration The video duration in milliseconds (number).
 * @returns A formatted string (e.g., "01:05:30" or "05:30").
 */
export const formatDuration = (duration: number): string => {
	// 1. Calculate total seconds
	const totalSeconds = Math.floor(duration / 1000);

	// 2. Calculate Hours (HH)
	// Total minutes divided by 60, then take the floor
	const hours = Math.floor(totalSeconds / 3600);

	// 3. Calculate Minutes (MM)
	// Total seconds divided by 60, then take the remainder when divided by 60
	const minutes = Math.floor((totalSeconds % 3600) / 60);

	// 4. Calculate Seconds (SS)
	// Total seconds, remainder when divided by 60
	const seconds = totalSeconds % 60;

	// Use padStart to ensure "05" instead of "5"
	const paddedMinutes = minutes.toString().padStart(2, '0');
	const paddedSeconds = seconds.toString().padStart(2, '0');

	if (hours > 0) {
		// If there are hours, return HH:MM:SS
		const paddedHours = hours.toString().padStart(2, '0');
		return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
	} else {
		// Otherwise, return MM:SS
		return `${paddedMinutes}:${paddedSeconds}`;
	}
};

// --- Example Usage ---
// console.log(formatDuration(3599000)); // 3599000 ms = 59:59 minutes -> "59:59"
// console.log(formatDuration(3600000)); // 3600000 ms = 1 hour -> "01:00:00"
// console.log(formatDuration(3500));    // 3500 ms = 3.5 seconds -> "00:03"

/**
 * Converts a string (typically an uppercase enum or snake_case string)
 * into a Title Case string, replacing underscores with spaces.
 * * Examples:
 * - "PRIVATE" -> "Private"
 * - "TEST_WORD" -> "Test Word"
 * * @param str The input enum string (e.g., "PUBLIC", "VIDEO_PRIVATE").
 * @returns A formatted Title Case string.
 */
export const snakeCaseToTitle = (str: string): string => {
	if (!str || typeof str !== 'string') {
		return 'Error';
	}

	// 1. Replace all underscores with a space.
	// This handles "TEST_WORD" -> "TEST WORD"
	const spacedStr = str.replace(/_/g, ' ');

	// 2. Convert the entire string to lowercase.
	// "TEST WORD" -> "test word" or "PRIVATE" -> "private"
	const lower = spacedStr.toLowerCase();

	// 3. Split the string by spaces (which now separates words).
	// 4. Map over each word, capitalize the first letter, and keep the rest lowercase.
	// 5. Join the words back together with a single space.
	return lower
		.split(' ')
		.map(
			(word) =>
				// Ensures words like "private" become "Private"
				word.charAt(0).toUpperCase() + word.slice(1),
		)
		.join(' ');
};

// --- Examples ---
// console.log(`"PRIVATE" -> ${formatEnumToTitle("PRIVATE")}`);           // Output: Private
// console.log(`"TEST_WORD" -> ${formatEnumToTitle("TEST_WORD")}`);       // Output: Test Word
// console.log(`"UNLISTED" -> ${formatEnumToTitle("UNLISTED")}`);         // Output: Unlisted
// console.log(`"VIDEO_DRAFT_PENDING" -> ${formatEnumToTitle("VIDEO_DRAFT_PENDING")}`); // Output: Video Draft Pending
