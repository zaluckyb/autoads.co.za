Absolutely. Below is a ready-to-drop **Payload CMS block** (for Payload `3.56.x`) that stores a PDF and rendering options. I’m also including a matching **frontend React component** (Next.js-friendly) that uses **pdf.js + StPageFlip** to render the flipbook.

---

# 1) Payload block: `FlipbookBlock.ts`

Create this file at `src/blocks/FlipbookBlock.ts`:

```ts
// src/blocks/FlipbookBlock.ts
import type { Block } from 'payload/types';

export const FlipbookBlock: Block = {
  slug: 'flipbook',
  labels: {
    singular: 'Flipbook',
    plural: 'Flipbooks',
  },
  interfaceName: 'FlipbookBlock', // generates TS types if using payload types
  fields: [
    {
      name: 'source',
      type: 'tabs',
      tabs: [
        {
          label: 'Upload PDF',
          fields: [
            {
              name: 'pdf',
              type: 'upload',
              relationTo: 'media', // see Media collection below
              required: false,
              filterOptions: {
                mimeType: { equals: 'application/pdf' },
              },
              admin: { description: 'Upload or pick a PDF from Media.' },
            },
          ],
        },
        {
          label: 'External URL',
          fields: [
            {
              name: 'url',
              type: 'text',
              required: false,
              admin: { description: 'Use a public URL to a PDF if not uploading.' },
              validate: (val) => {
                if (!val) return true;
                try {
                  // crude URL validation
                  new URL(val);
                  return true;
                } catch {
                  return 'Please enter a valid URL';
                }
              },
            },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'width',
          type: 'number',
          defaultValue: 1000,
          admin: { width: '50%', description: 'Max width (px) of the flipbook surface.' },
        },
        {
          name: 'height',
          type: 'number',
          defaultValue: 650,
          admin: { width: '50%', description: 'Height (px) of the flipbook surface.' },
        },
      ],
    },
    {
      name: 'singlePage',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Use single-page mode (good for very narrow layouts).' },
    },
    {
      name: 'shadow',
      type: 'number',
      defaultValue: 0.2,
      admin: { description: 'Max shadow opacity (0.0 – 1.0).' },
      validate: (val) => (val >= 0 && val <= 1 ? true : 'Must be between 0 and 1'),
    },
    {
      name: 'showPageCorners',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal note for editors (not displayed on the site).',
      },
    },
  ],
};
```

### Add it to a Blocks field

In the collection where you want blocks (e.g., `Pages`):

```ts
// src/collections/Pages.ts
import type { CollectionConfig } from 'payload/types';
import { FlipbookBlock } from '../blocks/FlipbookBlock';

export const Pages: CollectionConfig = {
  slug: 'pages',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [FlipbookBlock /*, other blocks... */],
      admin: { initCollapsed: true },
    },
  ],
};
```

### Media collection (for PDFs)

If you don’t already have one:

```ts
// src/collections/Media.ts
import type { CollectionConfig } from 'payload/types';

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      admin: { description: 'Optional alt/description.' },
    },
  ],
};
```

And register it in your Payload config:

```ts
// src/payload.config.ts
import { buildConfig } from 'payload/config';
import { Pages } from './collections/Pages';
import { Media } from './collections/Media';

export default buildConfig({
  collections: [Pages, Media],
  // ...rest of your config
});
```

---

# 2) Frontend Flipbook renderer (Next.js)

Install deps in your Next.js app:

```bash
npm i pdfjs-dist st-pageflip
```

Create `components/Flipbook.tsx`:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'st-pageflip/dist/css/st-pageflip.css';
import { PageFlip, SizeType } from 'st-pageflip';

type Props = {
  file: string;
  width?: number;
  height?: number;
  singlePage?: boolean;
  shadow?: number;           // 0..1
  showPageCorners?: boolean; // default true
};

export default function Flipbook({
  file,
  width = 1000,
  height = 650,
  singlePage = false,
  shadow = 0.2,
  showPageCorners = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pageFlipRef = useRef<PageFlip | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Prefer a locally hosted worker at /pdf.worker.min.js
    // (you can copy from node_modules/pdfjs-dist/build during build/postinstall)
    try {
      // @ts-ignore
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
    } catch {
      // fallback CDN
      // @ts-ignore
      pdfjsLib.GlobalWorkerOptions.workerSrc =
        `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${(pdfjsLib as any).version}/pdf.worker.min.js`;
    }

    const load = async () => {
      try {
        const loadingTask = (pdfjsLib as any).getDocument({ url: file });
        const pdf = await loadingTask.promise;

        const images: string[] = [];
        for (let p = 1; p <= pdf.numPages; p++) {
          const page = await pdf.getPage(p);
          const viewport = page.getViewport({ scale: 2 });
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d')!;
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          await page.render({ canvasContext: ctx, viewport }).promise;
          images.push(canvas.toDataURL('image/jpeg', 0.9));
        }

        const pagesWrapper = document.createElement('div');
        pagesWrapper.style.width = width + 'px';
        pagesWrapper.style.height = height + 'px';

        for (const src of images) {
          const pageEl = document.createElement('div');
          pageEl.className = 'page';
          pageEl.style.width = '100%';
          pageEl.style.height = '100%';
          pageEl.style.background = '#fff';
          pageEl.style.display = 'flex';
          pageEl.style.alignItems = 'center';
          pageEl.style.justifyContent = 'center';
          const img = document.createElement('img');
          img.src = src;
          img.style.maxWidth = '100%';
          img.style.maxHeight = '100%';
          pageEl.appendChild(img);
          pagesWrapper.appendChild(pageEl);
        }

        if (!containerRef.current) return;
        containerRef.current.innerHTML = '';
        containerRef.current.appendChild(pagesWrapper);

        pageFlipRef.current = new PageFlip(pagesWrapper, {
          width: Math.round(width / (singlePage ? 1 : 2)),
          height,
          size: 'stretch' as SizeType,
          maxShadowOpacity: shadow,
          showCover: false,
          mobileScrollSupport: true,
          useMouseEvents: true,
          disableFlipByClick: false,
          autoSize: true,
          minWidth: 320,
          minHeight: 420,
          maxWidth: 2000,
          maxHeight: 2000,
          showPageCorners,
          drawShadow: true,
          flippingTime: 700,
          startZIndex: 3,
          renderOnce: false,
          swipeDistance: 30,
          singlePageMode: singlePage,
        });

        const pf = pageFlipRef.current;
        const keyHandler = (e: KeyboardEvent) => {
          if (!pf) return;
          if (e.key === 'ArrowRight') pf.flipNext();
          if (e.key === 'ArrowLeft') pf.flipPrev();
        };
        window.addEventListener('keydown', keyHandler);
        return () => window.removeEventListener('keydown', keyHandler);
      } catch (err: any) {
        console.error(err);
        setError(err?.message || 'Failed to load flipbook');
      }
    };

    const cleanup = () => {
      if (pageFlipRef.current) {
        try { pageFlipRef.current.destroy(); } catch {}
        pageFlipRef.current = null;
      }
      if (containerRef.current) containerRef.current.innerHTML = '';
    };

    load();
    return cleanup;
  }, [file, width, height, singlePage, shadow, showPageCorners]);

  return (
    <div style={{ padding: 16 }}>
      <link
        rel="stylesheet"
        href="https://unpkg.com/st-pageflip@2.0.8/dist/css/st-pageflip.css"
      />
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 12 }}>
        <button onClick={() => pageFlipRef.current?.flipPrev()}>Prev</button>
        <button onClick={() => pageFlipRef.current?.flipNext()}>Next</button>
        <span style={{ opacity: 0.6, fontSize: 12 }}>Use ← → keys</span>
      </div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <div
        ref={containerRef}
        style={{
          width: '100%',
          maxWidth: width,
          height,
          margin: '0 auto',
          borderRadius: 8,
          border: '1px solid #e5e5e5',
          boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          background: '#fafafa',
        }}
      />
    </div>
  );
}
```

Optional: Copy the pdf.js worker at install/build time so `/pdf.worker.min.js` is served locally by your app:

```json
// package.json (Next.js app)
{
  "scripts": {
    "postinstall": "node scripts/copy-pdf-worker.cjs"
  },
  "dependencies": {
    "pdfjs-dist": "4.10.38",
    "st-pageflip": "2.0.8"
  }
}
```

```js
// scripts/copy-pdf-worker.cjs
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const srcWorker = path.join(root, 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.js');
const outDir = path.join(root, 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (fs.existsSync(srcWorker)) {
  fs.copyFileSync(srcWorker, path.join(outDir, 'pdf.worker.min.js'));
  console.log('Copied pdf.worker.min.js to /public');
}
```

---

# 3) Frontend block renderer

Where you render your page layout from Payload, map the `flipbook` block to the `Flipbook` component. Example:

```tsx
// components/RenderBlocks.tsx
import Flipbook from './Flipbook';

type Media = {
  url?: string;
  filename?: string;
};

type FlipbookBlockData = {
  blockType: 'flipbook';
  source?: {
    pdf?: Media | string; // payload may return id or populated doc depending on depth
    url?: string | null;
  };
  width?: number;
  height?: number;
  singlePage?: boolean;
  shadow?: number;
  showPageCorners?: boolean;
};

export default function RenderBlocks({ layout }: { layout: any[] }) {
  return (
    <>
      {layout?.map((block, i) => {
        switch (block.blockType) {
          case 'flipbook': {
            const b = block as FlipbookBlockData;

            // Resolve the PDF URL
            let fileUrl: string | undefined;

            // If editor used upload:
            const pdfField = b.source?.pdf;
            if (pdfField && typeof pdfField === 'object' && pdfField.url) {
              fileUrl = pdfField.url; // e.g. /media/your.pdf
            } else if (typeof pdfField === 'string') {
              // If you only received an ID (depth=0), fetch the media doc beforehand or build a URL
              // fileUrl = buildFromId(pdfField)
            }

            // Or if editor supplied external URL:
            if (!fileUrl && b.source?.url) fileUrl = b.source.url;

            if (!fileUrl) {
              return <p key={i} style={{ color: 'crimson' }}>
                Flipbook: no PDF selected or URL provided.
              </p>;
            }

            return (
              <Flipbook
                key={i}
                file={fileUrl}
                width={b.width ?? 1000}
                height={b.height ?? 650}
                singlePage={b.singlePage ?? false}
                shadow={b.shadow ?? 0.2}
                showPageCorners={b.showPageCorners ?? true}
              />
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
}
```

Then in your page template:

```tsx
// app/[slug]/page.tsx (or wherever you render a Page)
import RenderBlocks from '@/components/RenderBlocks';

// fetch your page from Payload (GraphQL or REST) and pass page.layout to RenderBlocks...
```

---
