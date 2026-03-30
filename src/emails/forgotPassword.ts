type BuildArgs = {
  token: string
  serverURL: string
  userEmail?: string
}

const SITE_NAME = 'AutoAds'

export const buildForgotPasswordEmailSubject = (userEmail?: string): string => {
  const prefix = SITE_NAME ? `${SITE_NAME} – ` : ''
  return `${prefix}Reset your password${userEmail ? ` for ${userEmail}` : ''}`
}

export const buildForgotPasswordEmailHTML = ({ token, serverURL, userEmail }: BuildArgs): string => {
  const resetURL = `${serverURL}/admin/reset/${token}`
  const brand = SITE_NAME || 'Account'

  // Simple, responsive, inline-styled email template
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>Reset your password</title>
  <style>
        /* Basic inlined styles for most clients */
        body { margin:0; padding:0; background:#f5f7fb; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; }
        .container { max-width:600px; margin:0 auto; padding:24px; }
        .card { background:#ffffff; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.06); overflow:hidden; }
        .header { background:#ED0D0D; color:#ffffff; padding:24px; text-align:center; }
        .brand { font-size:20px; font-weight:600; margin:0; }
        .content { padding:24px; color:#111827; }
        .lead { font-size:16px; line-height:1.6; margin:0 0 16px; }
        .muted { color:#6b7280; font-size:14px; line-height:1.6; }
        .button { display:inline-block; background:#ED0D0D|; color:#ffffff !important; text-decoration:none; padding:12px 20px; border-radius:8px; font-weight:600; }
        .link { word-break:break-all; color:#ED0D0D; }
        .footer { text-align:center; color:#6b7280; font-size:12px; padding:16px 24px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="card">
          <div class="header">
            <p class="brand">${brand}</p>
          </div>
          <div class="content">
            <p class="lead">${userEmail ? `Hello, ${userEmail}.` : 'Hello,'}</p>
            <p class="lead">You’re receiving this because a password reset was requested for your account.</p>
            <p class="lead">Click the button below to reset your password:</p>
            <p style="margin: 20px 0">
              <a class="button" href="${resetURL}" target="_blank" rel="noopener noreferrer">Reset Password</a>
            </p>
            <p class="muted">If the button doesn’t work, copy and paste this link into your browser:</p>
            <p class="muted"><a class="link" href="${resetURL}" target="_blank" rel="noopener noreferrer">${resetURL}</a></p>
            <p class="muted">If you did not request this, you can safely ignore this email and your password will remain unchanged.</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} ${brand}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
  </html>
  `
}