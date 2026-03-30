# Implementation Details

This document outlines the implementation details for specific features of the Auto Industry News website, specifically focusing on the Home Page and Sidebar components.

## 1. The Home Page Leaderboard

The leaderboard advertisement is a high-visibility banner placed at the top of the main article content.

*   **Component**: `AutoAdsSlot`
*   **File**: `src/app/(frontend)/[slug]/page.tsx`
*   **Placement ID**: `cmjiqm6sa000d12xor26c3myq`
*   **Implementation**:
    The ad slot is centered and constrained to a maximum width of 729px to match the content column width. It loads dynamically using the client-side `AutoAds` script.
    ```tsx
    <div className="flex justify-center pb-16">
      <div className="w-full max-w-[729px]">
        <AutoAdsSlot placementId="cmjiqm6sa000d12xor26c3myq" />
      </div>
    </div>
    ```

## 2. The Sidebar About Us

The "About Us" section is a static content block located in the first column of the sidebar.

*   **File**: `src/app/(frontend)/[slug]/page.tsx`
*   **Styling**: Uses Tailwind CSS with `bg-muted` for a subtle background and `shadow` for depth.
*   **Content**: Contains a title, a brief description, and a link to the `/about-us` page with an arrow icon.
*   **Implementation**:
    ```tsx
    <div className="rounded-[10px] border bg-muted p-4 shadow">
      <h3 className="text-lg font-semibold">About Auto Industry News</h3>
      {/* ...content... */}
    </div>
    ```

## 3. The Sidebar Latest News

This section displays the three most recent posts, ensuring the currently viewed post is excluded.

*   **File**: `src/app/(frontend)/[slug]/page.tsx`
*   **Data Fetching**:
    *   `queryLatestPosts(excludedId)`: Fetches the 3 latest posts, excluding the current `postDoc.id`.
    *   **Double Filtering**: A client-side filter `latestPosts.filter(p => p.id !== postDoc.id)` is applied as a safety measure to guarantee exclusion.
*   **Component**: `SidebarPostCard` renders each post preview.
*   **Implementation**:
    ```tsx
    let latestPosts = await queryLatestPosts(postDoc.id)
    latestPosts = latestPosts.filter((p) => p.id !== postDoc.id)
    // ... rendering loop ...
    ```

## 4. Second Column Sidebar Advertisement (Top)

The first advertisement in the second sidebar column.

*   **Component**: `AutoAdsSlot`
*   **File**: `src/app/(frontend)/[slug]/page.tsx`
*   **Placement ID**: `cmjiqm6sa000e12xorvmxnbpz`
*   **Styling**:
    *   Wrapped in a card with `rounded-[15px]`, `border`, `bg-muted`, and `shadow`.
    *   Includes an "ADVERTISEMENT" label.
    *   Centered with a specific width container (`w-[300px]`) to accommodate standard ad sizes.

## 5. Second Column Sidebar Automotive Quote

A component that displays a random automotive-related quote.

*   **Component**: `AutomotiveQuotes`
*   **File**: `src/components/AutomotiveQuotes/index.tsx`
*   **Functionality**:
    *   Uses `useState` and `useEffect` to select a random quote from a local `quotes` array on mount.
    *   Displays the quote and author with a styled blockquote and citation.
*   **Styling**:
    *   Features a large, decorative quote icon (`lucide-react/Quote`) in the background (`absolute` positioning).
    *   Uses `group-hover` effects to change the icon color on hover.
    *   "QUOTE OF THE MOMENT" label in blue.

## 6. Second Column Sidebar Advertisement 2 (Bottom)

A second advertisement slot placed below the quote component.

*   **Component**: `AutoAdsSlot`
*   **File**: `src/app/(frontend)/[slug]/page.tsx`
*   **Placement ID**: `cmjiqm6sa000e12xorvmxnbpz` (Same placement ID as the top ad, allowing rotation or multiple instances).
*   **Implementation**: Identical styling and wrapper structure to the first sidebar advertisement.

## 7. Second Column Sidebar Automotive Fun Fact

A component that displays a random interesting fact about cars.

*   **Component**: `AutomotiveFunFacts`
*   **File**: `src/components/AutomotiveFunFacts/index.tsx`
*   **Functionality**:
    *   Similar to the Quotes component, it picks a random fact from a `facts` array on mount.
*   **Styling**:
    *   Uses a `Lightbulb` icon from `lucide-react` as a decorative background element.
    *   "DID YOU KNOW?" label in blue.
    *   Consistent card styling with the rest of the sidebar (`rounded-[15px]`, `bg-muted`, `shadow`).

## 8. The More {Category} News (Dynamic Height Matching)

A dynamic section that automatically populates the sidebar with additional news posts to match the length of the main article content. This ensures that long articles have a fully populated sidebar, avoiding empty whitespace.

*   **Component**: `DynamicMoreNews`
*   **File**: `src/components/DynamicMoreNews/index.tsx`
*   **Key Functionality**: **Content-Aware Infinite Scroll**
    *   The component uses a `ResizeObserver` to continuously monitor the height of the main article (`#main-article-content`) and the sidebar itself.
    *   **Logic**: It compares the bottom position of the sidebar with the bottom position of the main content.
    *   **Trigger**: If `sidebar.bottom < mainContent.bottom - 300px`, it triggers a server action (`fetchMoreNews`) to load the next available post.
    *   **Result**: As the user scrolls down a long article, new posts are appended one by one to the sidebar until it aligns with the end of the article.
*   **Data Fetching**:
    *   **Server Action**: `fetchMoreNews` (in `src/app/(frontend)/[slug]/actions.ts`)
    *   **Parameters**: Fetches 1 post at a time (`limit: 1`) to ensure precise height matching without overfilling.
    *   **Exclusion**: Maintains a list of already displayed IDs to prevent duplicates.
*   **Dynamic Title**:
    *   Adapts to the category name (e.g., "More Industry News"). Smartly handles "News" suffix to avoid redundancy (e.g., "More Industry News" instead of "More Industry News News").

## 9. Replication Guide: How to Clone This Layout to Another Website

To replicate this exact layout on another Payload CMS website, follow these steps:

### Step 1: Install Dependencies
Ensure the target project has the following dependencies:
```bash
npm install lucide-react clsx tailwind-merge
```

### Step 2: Copy Component Directories
Copy the following component folders from `src/components/` to the new project:
1.  `AutomotiveQuotes/` (Contains random quote logic and styling)
2.  `AutomotiveFunFacts/` (Contains random fact logic and styling)
3.  `DynamicMoreNews/` (Contains infinite scroll and fetch logic)
4.  `SidebarPostCard/` (The standardized post preview card)
5.  `AutoAds/` (The advertisement slot component)

### Step 3: Setup Data Fetching
In your `page.tsx` (or where you define the layout), ensure you have these data fetching functions:
```tsx
// Fetch latest posts excluding the current one
const queryLatestPosts = async (excludedId?: number): Promise<Post[]> => {
  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    limit: 3,
    where: {
      and: [
        { id: { not_equals: excludedId } },
        { _status: { equals: 'published' } }
      ]
    },
    sort: '-publishedAt',
  })
  return result.docs
}

// Fetch posts by category
const queryPostsByCategory = async ({ categoryId, limit = 10, excludedIds = [] }) => {
   // ... implementation using payload.find ...
}
```

### Step 4: Replicate Page Structure (Grid Layout)
The layout uses a responsive grid system. Copy this structure into your `page.tsx`:

```tsx
<div className="container py-8">
  {/* Leaderboard Ad */}
  <div className="flex justify-center pb-16">
    <div className="w-full max-w-[729px]">
       <AutoAdsSlot placementId="..." />
    </div>
  </div>

  <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_350px]">
    {/* Main Content Column */}
    <article>
       {/* ... Post Content ... */}
    </article>

    {/* Sidebar Column */}
    <aside className="space-y-8">
       {/* 1. About Us Widget */}
       <div className="rounded-[10px] border bg-muted p-4 shadow">...</div>

       {/* 2. Latest News Widget */}
       <div className="rounded-[10px] border border-dashed border-gray-300 dark:border-gray-700 bg-muted p-4 shadow">
          <h3 className="mb-4 text-xl font-bold">Latest News</h3>
          <div className="space-y-4">
             {latestPosts.map(post => <SidebarPostCard key={post.id} doc={post} />)}
          </div>
       </div>

       {/* 3. Second Column / Split Sidebar */}
       <div className="grid grid-cols-1 gap-4">
          {/* Ad Slot 1 */}
          <div className="rounded-[15px] border bg-muted shadow p-4 flex flex-col items-center">
             <span className="text-xs font-bold text-blue-600 mb-2">ADVERTISEMENT</span>
             <AutoAdsSlot placementId="..." />
          </div>

          {/* Automotive Quote */}
          <AutomotiveQuotes />

          {/* Ad Slot 2 */}
          <div className="rounded-[15px] border bg-muted shadow p-4 flex flex-col items-center">
             <span className="text-xs font-bold text-blue-600 mb-2">ADVERTISEMENT</span>
             <AutoAdsSlot placementId="..." />
          </div>

          {/* Fun Fact */}
          <AutomotiveFunFacts />
       </div>

       {/* 4. Dynamic More News */}
       <DynamicMoreNews 
          categoryId={categoryId} 
          categoryTitle={categoryTitle}
          excludedIds={[postDoc.id]} 
          initialPosts={initialMorePosts} 
       />
    </aside>
  </div>
</div>
```

### Step 5: Configure Tailwind CSS
Ensure your `tailwind.config.mjs` has the necessary theme colors defined, particularly `muted` and `border` colors if you are using the exact classes above. If not, replace `bg-muted` with a specific color like `bg-gray-100` or define the CSS variable.
