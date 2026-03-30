# Slug Generation Improvements

This document summarizes the changes made to improve slug generation behavior across the admin UI and backend.

## Overview
- Slugs auto-generate from `title` when blank, avoiding first-keystroke behavior.
- Admin UI waits ~20 seconds of inactivity before filling the slug.
- Manual overrides are preserved; locking prevents automatic changes.

## Changes Implemented

### 1) Unlock slug by default
- File: `payload/src/fields/slug/index.ts`
- Change: `slugLock` checkbox `defaultValue` set to `false` so editors don’t need to unlock before generation.

### 2) Backend hook generates slug when empty/whitespace
- File: `payload/src/fields/slug/formatSlug.ts`
- Behavior:
  - Formats non-empty slug input (spaces → dashes, lowercased, removes invalid chars).
  - Treats empty/whitespace slugs as missing and generates from fallback field (default `title`) on create or update.

### 3) Admin UI debounce for auto-fill
- File: `payload/src/fields/slug/SlugComponent.tsx`
- Behavior:
  - Auto-fills slug from `title` when unlocked and empty.
  - Debounce set to ~20 seconds of no typing before filling.
  - “Generate” and “Lock/Unlock” controls remain available.

## Resulting Behavior
- Create or edit a post/page:
  - Type a title → after ~20 seconds idle, slug auto-fills from the title.
  - If you manually type a slug, it is normalized and preserved.
  - On save/publish, if the slug is blank, the backend generates from the title.
- Locking:
  - Click “Lock” to freeze the slug; auto-fill stops.
  - Unlock to allow future auto-fill when the slug is empty.

## Configuration
- Fallback field for generation: configured via `slugField(fieldToUse?: string)`; default is `title`.
- Debounce window: `20000` ms in `SlugComponent.tsx`. Adjust the timeout there to change idle duration.

## Verification Steps
1. Create a new post or page.
2. Enter a title and pause for ~20 seconds; slug should populate.
3. Clear the slug and save/publish; backend will generate from the title.
4. Enter a custom slug and lock it; it remains unchanged and normalized.

## File References
- `payload/src/fields/slug/index.ts`
- `payload/src/fields/slug/formatSlug.ts`
- `payload/src/fields/slug/SlugComponent.tsx`

## Notes
- These changes aim to reduce friction during content creation while protecting intentional slugs. Adjust the debounce or fallback field to match your editorial workflow.