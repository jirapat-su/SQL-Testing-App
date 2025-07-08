import { cors } from '@elysiajs/cors'
import swagger from '@elysiajs/swagger'
import Elysia from 'elysia'

import { auth } from '@/src/libs/better-auth/auth'
import { authOpenAPI } from '@/src/libs/better-auth/open-api'
import { Logger } from '@/src/libs/logger'

import { requestID } from './plugins/request-id'
import { appRouter } from './routers'

const logger = new Logger('API')

const api = new Elysia({
  name: 'ElysiaJS API',
  prefix: '/api',
})
  .onAfterResponse({ as: 'global' }, ({ path }) => {
    logger.info(`[Request]`, path)
  })
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
  .use(appRouter)
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
