import { treaty } from '@elysiajs/eden'

import type { API } from '@/src/api'

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

const httpClient = treaty<API>(String(), {
  fetch: {
    credentials: 'include',
  },
  fetcher: (url, options) => fetch(normalizeUrl(url), options),
})

export { httpClient }
