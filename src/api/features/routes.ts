import type Elysia from 'elysia'

import { defaultRoute } from './default'
import { testDatabaseRoute } from './test-database'

export const apiRoutes = (app: Elysia) =>
  app.use(defaultRoute).use(testDatabaseRoute)
