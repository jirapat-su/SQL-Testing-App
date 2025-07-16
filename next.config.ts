import type { NextConfig } from 'next'

import '@/src/env'

const nextConfig: NextConfig = {
  /* config options here */
  compress: true,
  devIndicators: {
    position: 'bottom-right',
  },
  images: {
    unoptimized: true,
  },
  logging: {
    incomingRequests: false,
  },
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
