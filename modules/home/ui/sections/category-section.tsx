'use client';

import { FilterCarousel } from '@/components/filter-carousel';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface CategoriesSectionProps {
	categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
	const [categories, setCategories] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		async function load() {
			try {
				const res = await fetch('/api/categories');
				const data = await res.json();

				// Transform into the shape FilterCarousel expects
				const formatted = data.map((c: any) => ({
					value: c.id,
					label: c.name,
				}));

				setCategories(formatted);
			} finally {
				setIsLoading(false);
			}
		}

		load();
	}, []);

	const onSelect = (value: string | null) => {
		const url = new URL(window.location.href);

		if (value) {
			url.searchParams.set('categoryId', value);
		} else {
			url.searchParams.delete('categoryId');
		}

		router.push(url.toString());
	};

	return <FilterCarousel value={categoryId ?? null} data={categories} isLoading={isLoading} onSelect={onSelect} />;
};

// export const CategoriesSection = ({ categoryId }: CategoriesSectionProps) => {
// 	return (
// 		<Suspense fallback={<p>Loading...</p>}>
// 			<ErrorBoundary fallback={<p>Error...</p>}>
// 				<CategoriesSectionSuspense categoryId={categoryId} />
// 			</ErrorBoundary>
// 		</Suspense>
// 	);
// };

// const CategoriesSectionSuspense = ({ categoryId }: CategoriesSectionProps) => {
// 	const [categories, setCategories] = useState([]);

// 	useEffect(() => {
// 		async function load() {
// 			const res = await fetch('/api/categories');
// 			const data = await res.json();
// 			setCategories(data);
// 		}
// 		load();
// 	}, []);

// 	return <FilterCarousel data={categories} isLoading={false} onSelect={() => console.log('hello')} />;
// 	// return <div>{categories?.length ? JSON.stringify(categories) : ''}</div>;
// };

/**
 * 
 * 
 * is there any advantage of using suspense in here?
 * why suspense is not working here?
 * 
 * 
 * 
 * Short answer: **There is *no advantage*** in using `Suspense` + `ErrorBoundary` for a component that loads data using **fetch inside `useEffect()`** — because:

> **Suspense only works for data that is thrown during rendering, not inside useEffect.**

So in your current setup:
❌ Suspense fallback **will never show**
❌ ErrorBoundary **will never catch errors**
✔ You’re only seeing your manual loading state *inside the component*, not Suspense.

---

# ✅ Why Suspense is NOT working here

Suspense in React works **only** when a component "suspends" during render — meaning it throws a Promise.

But your code does this:

```tsx
useEffect(() => {
  async function load() {
    const res = await fetch('/api/categories');
    const data = await res.json();
    setCategories(data);
  }
  load();
}, []);
```

This means:

* Component renders immediately
* `useEffect` runs **after** rendering
* `Suspense` was already passed, so fallback won't appear
* No promise was thrown → no suspension

---

# ❌ When Suspense is pointless

Suspense is pointless whenever:

* You load data in `useEffect`
* You use normal fetch inside client components
* You set `loading` state manually

This is exactly your case.

---

# If you want Suspense to actually work…

You must use one of these:

### **1. Server Component returning data**

(Suspense wraps it and fallback works)

### **2. React cache + fetch inside a client component (experimental)**

### **3. A framework feature like Next.js `fetch()` caching on the server**

(Not inside `useEffect`)

---

# 👍 What should *you* do here?

Since you're using:

✔ Client component
✔ `useEffect`
✔ Fetching from `/api/categories`

Then the correct pattern is **manual loading**, NOT Suspense.

Example:

```tsx
"use client";

import { useEffect, useState } from "react";

export const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        setCategories(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return <div>{JSON.stringify(categories)}</div>;
};
```

✔ Loading state works
✔ No wasted Suspense wrappers
✔ Error handling is easier

---

# 🧠 But if you want to use Suspense correctly…

Use a **Server Component** for data loading:

```tsx
// Server Component
import { getCategories } from "@/lib/getCategories";

export default async function CategoriesWrapper() {
  const categories = await getCategories();
  
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <CategoriesClient categories={categories} />
    </Suspense>
  );
}
```

Then **client component receives ready data**.

---

# ✔ Conclusion

Your current component:

* Does **not** benefit from Suspense
* Should **not** use Suspense
* Should use a normal loading state
* Suspense fallback will **never** show with useEffect fetching

So the cleanest solution is to **remove Suspense & ErrorBoundary** unless you're using server-rendered data.

---

If you want, I can rewrite the component using:

✅ Server Component data loading
or
✅ Client Component with SWR (stronger pattern)
or
✅ React Query (best DX)

Just tell me which one you prefer!

 */
