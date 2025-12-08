import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { useEffect } from 'react';
import { Button } from './ui/button';

interface InfiniteScrollProps {
	isManual?: boolean;
	hasNextPage: boolean;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
}

export const InfiniteScroll = ({
	isManual = true,
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
}: InfiniteScrollProps) => {
	const { targetRef, isIntersecting } = useIntersectionObserver({ threshold: 0.5, rootMargin: '100px' });

	useEffect(() => {
		if (isIntersecting && hasNextPage && !isFetchingNextPage && !isManual) {
			fetchNextPage();
		}
	}, [isIntersecting, hasNextPage, isFetchingNextPage, isManual, fetchNextPage]);

	return (
		<div className="flex flex-col items-center gap-4 p-4">
			<div ref={targetRef} />
			{hasNextPage ? (
				<Button
					variant="secondary"
					disabled={!hasNextPage || isFetchingNextPage}
					onClick={() => fetchNextPage()}
				>
					{isFetchingNextPage ? 'Loading...' : 'Load more'}
				</Button>
			) : (
				<p className="text-xs text-muted-foreground">You have reached the end of the list</p>
			)}
		</div>
	);
};

/**
 * 
 * I apologize\! I'll make the explanation much simpler, focusing on what the **`targetRef`** and **`threshold`** do using an easy analogy.

## 🚶 The `targetRef` is a "Scroll Sensor"

Think of your infinite scrolling page like a very long list of items (like posts on a social media feed).

### **`targetRef` Explained**

The **`targetRef`** is like a **small, invisible sticky note** placed right at the end of the last item you've loaded on the page.

  * **Job:** Its only job is to be the **sensor** for the browser.
  * **Code:** In your code, the `div` with `ref={targetRef}` is that sticky note:
    ```jsx
    <div ref={targetRef} /> 
    ```
  * **Action:** When you **scroll down** and this invisible sticky note **comes into the screen** (the viewport), it sends a signal: **"Hey, I'm visible now\!"** This signal is what sets `isIntersecting` to `true`, which then tells the app, "Time to load the next page of content\!"

-----

## 📐 The `threshold` is the "Sensitivity Setting"

The **`threshold`** determines **how much of the `targetRef` sensor must be visible** on the screen before it sends the "I'm visible\!" signal.

### **`threshold: 0.5` Explained**

The value you have, **`{ threshold: 0.5 }`**, means:

| Threshold Value | Percentage of Sensor Visible | When it Triggers |
| :--- | :--- | :--- |
| **0.0** | 0% | Triggers the *instant* the sensor starts entering the screen. |
| **0.5** | **50%** | Triggers when the sensor is **halfway** into the screen. |
| **1.0** | 100% | Triggers only when the sensor is **completely** visible on the screen. |

So, your setting of **`0.5`** is telling the observer: "Wait until at least **half** of that `targetRef` sticky note is visible before you send the signal to load more data."

-----

## 🏎️ Bonus: `rootMargin: '100px'`

The **`rootMargin`** is like a **head start** or **warning zone** for the sensor.

  * **Job:** It expands the area *around* the screen (the "root") where the sensor is checked.
  * **`'100px'`:** This setting means, "Don't wait until the `targetRef` is *actually* on the screen. Start loading the data when the sensor is still **100 pixels *below* the bottom edge** of the screen."

This helps content load a little **before** the user hits the absolute end, making the scrolling feel smoother.

**In summary:** You place the **`targetRef` sensor** at the bottom, and when it crosses the **`threshold`** line (or the `rootMargin` warning zone) as you scroll, the new data is automatically fetched.

Does that explanation make the role of **`targetRef`** and **`threshold`** clearer?
 */
