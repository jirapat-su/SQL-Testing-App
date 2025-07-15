import type Elysia from 'elysia'

import { defaultRoute } from './default'
import { examDatabaseRoute } from './exam-database'

export const apiRoutes = (app: Elysia) =>
  app.use(defaultRoute).use(examDatabaseRoute)
