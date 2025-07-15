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
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
