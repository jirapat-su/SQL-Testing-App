import { TypeBox } from '@sinclair/typemap'
import Elysia from 'elysia'
import { z } from 'zod'

import { getSession } from '@/src/api/plugins/get-session'

import { ExamDatabaseService } from './service'

const service = new ExamDatabaseService()

const examDatabaseRouter = new Elysia({
  detail: {
    tags: ['Exam Database'],
  },
  name: 'Exam Database Router',
}).group('/exam_database', app =>
  app
    .use(getSession)
    .onBeforeHandle(({ session, status }) => {
      if (!session) return status(401, { message: 'Unauthorized' })
    })
    .get('/', async () => {
      const data = await service.getDatabases()

      return data
    })
    .get(
      '/:database_name/:table_name',
      async ({ params: { database_name, table_name } }) => {
        const data = await service.getTableData(database_name, table_name)

        return data
      },
      {
        params: TypeBox(
          z.object({
            database_name: z
              .string()
              .default('Hospital')
              .describe('Database name'),
            table_name: z.string().default('Nurse').describe('Table name'),
          })
        ),
      }
    )
)

export { examDatabaseRouter }
