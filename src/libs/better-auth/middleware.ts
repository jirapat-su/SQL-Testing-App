import type { Get, UniversalMiddleware } from '@universal-middleware/core'

import { auth } from './auth'

const authSessionMiddleware: Get<[], UniversalMiddleware> = () => async (request, context) => {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    return {
      ...context,
      session,
    }
  } catch (error) {
    console.error('betterAuthSessionMiddleware:', error)

    return {
      ...context,
      session: null,
    }
  }
}

export { authSessionMiddleware }
