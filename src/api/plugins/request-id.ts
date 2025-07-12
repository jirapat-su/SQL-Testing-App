import type Elysia from 'elysia'

import { randomUUID } from 'node:crypto'

export const REQUEST_ID_HEADER = 'X-Request-ID'

export const requestIDPlugin = (app: Elysia) =>
  app.onRequest(({ request: { headers }, set }) => {
    set.headers[REQUEST_ID_HEADER] =
      headers.get(REQUEST_ID_HEADER) || randomUUID()
  })
