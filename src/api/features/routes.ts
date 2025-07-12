import type Elysia from 'elysia'

import { defaultRouter } from './default'
import { testDatabaseRoute } from './test-database'

export const apiRoutes = (app: Elysia) =>
  app.use(defaultRouter).use(testDatabaseRoute)
