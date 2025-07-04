import type Elysia from 'elysia'

import { cache } from 'react'

import { auth } from '@/src/libs/better-auth/auth'

const cacheSession = cache(async (request: Request) => {
  const session = await auth.api.getSession({
    headers: request.headers,
  })

  return session
})

function getSession(app: Elysia) {
  return app.derive(async ({ request }) => {
    const { session, user } = (await cacheSession(request)) || {}
    return { session, user }
  })
}

export { getSession }
