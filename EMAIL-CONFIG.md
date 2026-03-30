# Email Configuration & Templates

This document explains how SMTP email was configured for Payload, how the password reset email template was customized, and which files were changed or added.

## Overview

- Configures Payload to send email via SMTP using the Nodemailer adapter.
- Adds a branded, responsive HTML template for Forgot Password emails.
- Wires the Users collection to use the custom subject and HTML template.
- Provides a preview route to quickly view the email HTML in the browser.

## SMTP Setup (Nodemailer Adapter)

- Location: `payload/src/payload.config.ts`
- Uses `@payloadcms/email-nodemailer` adapter with environment variables.
- Keys:
  - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`
  - `defaultFromName` is set to `AutoAds` and can be adjusted.

Example configuration block:

```ts
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

email: nodemailerAdapter({
  transportOptions: {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // true for SSL (e.g., 465)
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  },
  defaultFromName: 'AutoAds',
  defaultFromAddress: process.env.SMTP_FROM || '',
})
```

## Forgot Password Email Template

- Location: `payload/src/emails/forgotPassword.ts`
- Exports:
  - `buildForgotPasswordEmailSubject(userEmail?: string)`
  - `buildForgotPasswordEmailHTML({ token, serverURL, userEmail })`
- Resets link points to: `https://<server-url>/admin/reset/<token>` (Payload Admin reset page)
- Branding color updated to red `#ED0D0D` for header, button, and links.

Notes:
- You can change the brand name by editing `SITE_NAME` in the template file.
- If you want to use a frontend page instead of the Admin reset page, update the `resetURL` in the template accordingly.

## Wiring Template Into Users Collection

- Location: `payload/src/collections/Users/index.ts`
- Replaces `auth: true` with a configuration that customizes Forgot Password subject and HTML:

```ts
import { getServerSideURL } from '@/utilities/getURL'
import { buildForgotPasswordEmailHTML, buildForgotPasswordEmailSubject } from '@/emails/forgotPassword'

auth: {
  forgotPassword: {
    generateEmailSubject: ({ user }) =>
      buildForgotPasswordEmailSubject((user as any)?.email ?? undefined),
    generateEmailHTML: ({ token, user }) => {
      const serverURL = getServerSideURL()
      return buildForgotPasswordEmailHTML({
        token,
        serverURL,
        userEmail: (user as any)?.email ?? undefined,
      })
    },
  },
},
```

## Preview Route (Browser)

- Location: `payload/src/app/(frontend)/next/preview-reset-email/route.ts`
- Returns the generated HTML directly, useful for visual checks without sending an email.
- Usage:
  - Start the dev server in `payload/`: `pnpm dev`
  - Open: `http://localhost:3000/next/preview-reset-email?token=example-token&email=user@example.com`
  - The route sets an `x-subject` header with the generated subject.

## Test SMTP Route (Optional)

- Location: `payload/src/app/(frontend)/next/test-email/route.ts`
- Sends a simple test email using `payload.sendEmail`.
- Usage:
  - `GET http://localhost:3000/next/test-email?to=you@example.com`

## Environment Variables

Ensure these keys are present in `payload/.env`:

```
SMTP_HOST=smtp.example.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
SMTP_FROM=no-reply@example.com

NEXT_PUBLIC_SERVER_URL=http://localhost:3000
PAYLOAD_SECRET=your-secret
```

## Files Added / Modified

- Modified: `payload/src/payload.config.ts`
  - Added Nodemailer adapter with `defaultFromAddress` and `defaultFromName`.
- Modified: `payload/src/collections/Users/index.ts`
  - Implemented `auth.forgotPassword.generateEmailSubject` and `generateEmailHTML`.
- Added: `payload/src/emails/forgotPassword.ts`
  - Reusable subject and HTML builder with red `#ED0D0D` branding.
- Added: `payload/src/app/(frontend)/next/preview-reset-email/route.ts`
  - Preview the email template in the browser.

## Troubleshooting

- `EAUTH 535 Invalid login`:
  - Indicates incorrect SMTP credentials (user/pass), wrong auth format, or account restrictions.
  - Verify `SMTP_USER` and `SMTP_PASS`, ensure `SMTP_SECURE`/`SMTP_PORT` match your provider, and double-check `SMTP_FROM` is a valid sender.
- Emails not received:
  - Check spam folder, SPF/DKIM/DMARC records, and whether your SMTP provider allows the `from` address.
- Link points to Admin:
  - If you want a custom frontend reset page, change the `resetURL` in `forgotPassword.ts` and handle the token on your frontend by calling the Payload reset endpoint.

## Next Steps

- Adjust branding (text/color) in `forgotPassword.ts` if needed.
- If sending from a custom domain, configure SPF/DKIM and verify sender addresses with your provider.
- Use the preview route to validate visual changes quickly before sending.