import { treaty } from '@elysiajs/eden'

import type { API } from '@/src/api'

const httpClient = treaty<API>(
  typeof process === 'undefined'
    ? import.meta.env.PUBLIC_ENV__API_URL
    : process.env.API_URL,
  {},
)

export { httpClient }
