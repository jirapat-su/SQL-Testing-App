import type Elysia from 'elysia'

import { getSessionPlugin } from './get-session'

export const authorizationPlugin = (app: Elysia) =>
  app.use(getSessionPlugin).onBeforeHandle(({ session, status }) => {
    if (!session) return status(401, { message: 'Unauthorized' })
  })
