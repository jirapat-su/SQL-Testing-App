import type Elysia from 'elysia'

export const generateCacheKeyPlugin = (app: Elysia) =>
  app.derive(async ({ body, params, path, query, request: { method } }) => {
    const cacheKey = `${method}:${path}:${JSON.stringify({ body, params, query })}`
    return { cacheKey }
  })
