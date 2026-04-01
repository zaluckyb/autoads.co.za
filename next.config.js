import { withPayload } from '@payloadcms/next/withPayload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    qualities: [25, 50, 75, 90, 100],
    // Disable built-in optimizer to avoid /_next/image requests in production
    unoptimized: true,
    // Allow images from the live domain explicitly
    remotePatterns: [
      { protocol: 'https', hostname: 'cheap-flight.co.za' },
      { protocol: 'http', hostname: 'cheap-flight.co.za' },
      // Also include whatever origin Next thinks it is, if provided
      ...(
        NEXT_PUBLIC_SERVER_URL
          ? (() => {
              try {
                const url = new URL(NEXT_PUBLIC_SERVER_URL)
                return [
                  {
                    hostname: url.hostname,
                    protocol: url.protocol.replace(':', ''),
                  },
                ]
              } catch (_) {
                return []
              }
            })()
          : []
      ),
    ],
  },
  webpack: (webpackConfig, { isServer }) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    // React 19 and RSC compatibility fixes
    webpackConfig.resolve.alias = {
      ...webpackConfig.resolve.alias,
      react: 'react',
      'react-dom': 'react-dom',
    }

    // Ensure proper module resolution for React Server Components
    webpackConfig.resolve.fallback = {
      ...webpackConfig.resolve.fallback,
      'react/jsx-runtime': 'react/jsx-runtime',
      'react/jsx-dev-runtime': 'react/jsx-dev-runtime',
    }

    // Optimize for non-server builds
    if (!isServer) {
      webpackConfig.resolve.mainFields = ['browser', 'module', 'main']
    }

    return webpackConfig
  },
  reactStrictMode: false, // Temporarily disable to isolate the issue
  compiler: {
    emotion: false,
  },
  reactCompiler: false,
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'node_modules/@payloadcms/ui/dist/scss'),
      path.join(__dirname, 'node_modules/@payloadcms/ui/scss'),
      path.join(__dirname, 'src/scss')
    ],
  },
  experimental: {
    optimizePackageImports: ['@payloadcms/richtext-lexical'],
  },
  transpilePackages: ['@payloadcms/richtext-lexical', '@payloadcms/ui'],
  serverExternalPackages: ['@payloadcms/db-mongodb'],
  async rewrites() {
    return [
      {
        source: '/ts/:path*',
        destination: 'https://www.travelstart.co.za/:path*',
      },
    ]
  },
  redirects,
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
