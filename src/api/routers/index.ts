import type Elysia from 'elysia'

import { defaultRouter } from './default'
import { examDatabaseRouter } from './exam_database'

const appRouter = (app: Elysia) =>
  app.use(defaultRouter).use(examDatabaseRouter)

export { appRouter }
