import type { Get, UniversalHandler } from '@universal-middleware/core'

import { createHandler, createMiddleware } from '@universal-middleware/elysia'
import Elysia from 'elysia'
import { renderPage } from 'vike/server'

import { api } from '@/src/api'

import { authSessionMiddleware } from './src/libs/better-auth/middleware'

export const vikeHandler: Get<[], UniversalHandler> =
  () => async (request, context, runtime) => {
    const pageContextInit = {
      ...context,
      ...runtime,
      headersOriginal: request.headers,
      urlOriginal: request.url,
    }
    const pageContext = await renderPage(pageContextInit)
    const response = pageContext.httpResponse
    const readable = response.getReadableWebStream()

    return new Response(readable, {
      headers: response.headers,
      status: response.statusCode,
    })
  }

const app = new Elysia({})
  .use(createMiddleware(authSessionMiddleware)())
  .use(api)
  .all('*', createHandler(vikeHandler)())

const GET = app.handle
const POST = app.handle
const PUT = app.handle
const DELETE = app.handle
const PATCH = app.handle
const OPTIONS = app.handle
const HEAD = app.handle

export default process.env.VERCEL === '1' ? undefined : app
export { DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT }
