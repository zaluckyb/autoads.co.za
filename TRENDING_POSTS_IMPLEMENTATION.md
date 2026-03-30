# Trending Posts Implementation Guide

This document outlines how we implemented the "Trending Posts" feature, which tracks post views and displays the most popular content.

## Overview
The system consists of three main parts:
1.  **Database Field**: A field to store the view count for each post.
2.  **Tracking Logic**: A mechanism to increment this count whenever a user visits a post.
3.  **Display Logic**: A block to fetch and display posts sorted by their view count.

---

## 1. Database Schema (The "Views" Field)
We added a simple number field to the `Posts` collection to store the view count.

**File:** `src/collections/Posts/index.ts`

```typescript
fields: [
  // ... other fields
  {
    name: 'views',
    type: 'number',
    admin: {
      position: 'sidebar',
      readOnly: true, // Prevent manual editing in admin
    },
    defaultValue: 0,
  },
]
```

---

## 2. Tracking Views (The Counter)
We utilize a **Server Action** to safely update the database from the client side without exposing API keys or complex logic to the browser.

### A. The Server Action
This function runs on the server. It takes a `postId`, finds the current view count, and increments it by 1.

**File:** `src/app/(frontend)/[slug]/actions.ts`

```typescript
'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function incrementPostViews(postId: number) {
  const payload = await getPayload({ config: configPromise })
  
  try {
    // 1. Fetch current post to get current views
    const post = await payload.findByID({
      collection: 'posts',
      id: postId,
    })
    
    if (post) {
      // 2. Update the post with incremented view count
      await payload.update({
        collection: 'posts',
        id: postId,
        data: {
          views: (post.views || 0) + 1,
        },
      })
    }
  } catch (error) {
    console.error('Error incrementing views:', error)
  }
}
```

### B. The Client Trigger
We trigger this action automatically when a user visits a post page using a `useEffect` hook in a client component.

**File:** `src/app/(frontend)/[slug]/PostPageClient.tsx`

```tsx
'use client'
import React, { useEffect } from 'react'
import { incrementPostViews } from './actions'

const PostPageClient: React.FC<{ postId?: number }> = ({ postId }) => {
  useEffect(() => {
    if (postId) {
      // Fire and forget - we don't need to wait for the result
      incrementPostViews(postId)
    }
  }, [postId])

  return <React.Fragment />
}
```

---

## 3. Displaying Trending Posts
To display the trending posts, we created a custom block that queries the API and sorts results by the `views` field in descending order (`-views`).

**File:** `src/blocks/TrendingPosts/Component.tsx`

```tsx
// Inside the component's data fetching logic
const params = new URLSearchParams()
params.set('limit', String(limit))
params.set('sort', '-views') // <--- This does the magic

// Fetch from Payload API
const res = await fetch(`${base}/api/posts?${params.toString()}`)
```

### How to Use It
1.  Go to the **Pages** collection in the Admin Panel.
2.  Edit the **Home** page (or any page).
3.  Add a **Trending Posts** block to the layout.
4.  (Optional) Configure the number of posts to show.
5.  Save and Publish.

The block will now automatically display the posts with the highest view counts.
