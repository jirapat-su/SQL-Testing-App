import { cors } from '@elysiajs/cors'
import swagger from '@elysiajs/swagger'
import Elysia from 'elysia'

import type { ErrorService } from '@/src/utils/error-service'

import pkg from '@/package.json'
import { auth, authOpenAPI } from '@/src/libs/better-auth'
import { Logger } from '@/src/utils/logger'

import { apiRoutes } from './features/routes'
import { REQUEST_ID_HEADER, requestIDPlugin } from './plugins/request-id'

const logger = new Logger('API')

export const elysiaApp = new Elysia({
  name: 'API',
  prefix: '/api',
})
  .onAfterResponse({ as: 'global' }, ({ path }) => {
    logger.info(`[Request]`, path)
  })
  // Handle errors globally
  .onError(
    { as: 'global' },
    ({ body, error, params, path, query, response, set }) => {
      logger.error(`[Request ID]`, set.headers[REQUEST_ID_HEADER])
      logger.error(`[Path]`, path)
      logger.error(`[Params]`, params)
      logger.error(`[Query]`, query)
      logger.error(`[Body]`, body)
      logger.error(`[Response]`, response)
      logger.error(`[Error]`, JSON.stringify(error, null, 2))

      const err = error as ErrorService
      set.status = err?.status ?? 500

      return {
        ...(err?.status === 422 && { detail: err }),
        message: err?.message ?? 'An error occurred',
        'request-id': set.headers[REQUEST_ID_HEADER],
        status: err?.status ?? 500,
        success: false,
      }
    }
  )
  // Mount the better-auth handler
  .mount(auth.handler)
  // App plugins
  .use(requestIDPlugin)
  // Cors
  .use(
    cors({
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Accept',
        'Origin',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
      ],
      credentials: true,
      maxAge: 7200,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      origin: true,
      preflight: true,
    })
  )
  // App routes
  .use(apiRoutes)
  // Swagger
  .use(
    swagger({
      documentation: {
        components: await authOpenAPI.components,
        info: {
          title: 'API Documentation',
          version: pkg.version,
        },
        paths: await authOpenAPI.getPaths(),
      },
      exclude: ['/api/docs', '/api/docs/json'],
      path: '/docs',
      scalarConfig: {
        defaultHttpClient: {
          clientKey: 'fetch',
          targetKey: 'javascript',
        },
        spec: { url: '/api/docs/json' },
      },
    })
  )

export type TElysiaApp = typeof elysiaApp
