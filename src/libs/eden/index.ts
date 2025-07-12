import type { AxiosResponse } from 'axios'

import { treaty } from '@elysiajs/eden'
import axios from 'axios'

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

const axiosToFetchResponse = (axiosResponse: AxiosResponse): Response => {
  const { data, headers, status, statusText } = axiosResponse

  const responseInit: ResponseInit = {
    headers: new Headers(Object.entries(headers)),
    status,
    statusText,
  }

  const blob = new Blob([JSON.stringify(data)], {
    type: headers['content-type'] || 'application/json',
  })

  const readableStream = new ReadableStream({
    start(controller) {
      const reader = blob.stream().getReader()
      return pump()
      function pump(): unknown {
        return reader.read().then(({ done, value }) => {
          if (done) {
            controller.close()
            return
          }
          controller.enqueue(value)
          return pump()
        })
      }
    },
  })

  return new Response(readableStream, responseInit)
}

const httpClient = treaty<API>(String(), {
  fetcher: async (url, options) => {
    const { body, headers, method, ...ops } = options ?? {}

    const response = await axios(normalizeUrl(url), {
      data: body,
      fetchOptions: {
        ...ops,
      },
      headers: {
        'Content-Type': 'application/json',
        ...(headers as Record<string, string>),
      },
      method: method || 'GET',
      responseType: 'json',
      timeout: 5000,
    })

    return axiosToFetchResponse(response)
  },
})

export { httpClient }
