import { cors } from '@elysiajs/cors'
import swagger from '@elysiajs/swagger'
import Elysia from 'elysia'

import { auth } from '@/src/libs/better-auth/auth'
import { authOpenAPI } from '@/src/libs/better-auth/open-api'
import { Logger } from '@/src/libs/logger'

import type { ErrorService } from '../utils/error-service'

import { apiRoutes } from './features/routes'
import { REQUEST_ID_HEADER, requestID } from './plugins/request-id'

const logger = new Logger('API')

const api = new Elysia({
  name: 'ElysiaJS API',
  prefix: '/api',
})
  .onAfterResponse({ as: 'global' }, ({ path }) => {
    logger.info(`[Request]`, path)
  })
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

      return Response.json(
        {
          ...(err?.status === 422 && { detail: err }),
          message: err?.message,
          'request-id': set.headers[REQUEST_ID_HEADER],
          status: err?.status,
          success: false,
        },
        {
          status: err?.status ?? 500,
        }
      )
    }
  )
  .use(requestID)
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
  .mount(auth.handler)
  .use(apiRoutes)
  .use(
    swagger({
      documentation: {
        components: await authOpenAPI.components,
        info: {
          title: 'API Documentation',
          version: '1.0.0',
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

export type API = typeof api
export { api }
