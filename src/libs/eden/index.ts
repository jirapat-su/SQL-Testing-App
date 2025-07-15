import { treaty } from '@elysiajs/eden'

import type { TElysiaApp } from '@/src/app/api/main'

const normalizeUrl = (input: Request | string | URL): string => {
  try {
    if (!input) throw new Error('URL input cannot be null or undefined')

    const urlString =
      typeof input === 'string'
        ? input
        : input instanceof Request
          ? input.url
          : input instanceof URL
            ? input.toString()
            : null

    if (!urlString) throw new Error('Invalid URL input type')

    const normalized = `/${urlString.replace(/^(https?:\/\/)?(.+)$/i, '$2')}`
    return normalized
  } catch (error) {
    throw new Error(`Failed to normalize URL: ${(error as Error).message}`)
  }
}

const httpClient = treaty<TElysiaApp>(String(), {
  fetch: {
    next: { revalidate: 0 },
  },
  fetcher: (url, options) => fetch(normalizeUrl(url), options),
})

export { httpClient }
