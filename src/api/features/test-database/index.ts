import { TypeBox } from '@sinclair/typemap'
import { Effect } from 'effect'
import Elysia from 'elysia'

import { EffectHelpers } from '@/src/libs/effect'
import { ErrorService } from '@/src/utils/error-service'

import { authorizationPlugin } from '../../plugins/authorization'
import { TestDatabaseRuntime } from './runtime'
import { handlerSchema } from './schema'
import { TestDatabaseService } from './service'

export const testDatabaseRoute = new Elysia({
  detail: {
    tags: ['Test Database'],
  },
  name: 'Test Database Router',
  prefix: '/test-database',
})
  .use(authorizationPlugin)
  .get(
    '/',
    async () => {
      const result = await TestDatabaseService.pipe(
        Effect.andThen(srv => srv.getAllDatabase()),
        Effect.catchTags({
          'MySQL/Connection/Error': error => {
            return Effect.fail(
              new ErrorService(500, 'Failed to connect to the database', {
                error,
              })
            )
          },
          'Task/GetAllDatabase/Error': error => {
            return Effect.fail(
              new ErrorService(400, 'Failed to fetch databases', {
                error,
              })
            )
          },
        }),
        TestDatabaseRuntime.runPromiseExit
      ).then(EffectHelpers.getDataOrThrowRawError)

      return {
        result,
        success: true,
      }
    },
    {
      detail: {
        description: 'Fetches a list of all available databases.',
        summary: 'Get all databases',
      },
    }
  )
  .get(
    '/:databaseName/:tableName',
    async ({ params }) => {
      const { databaseName, tableName } = params

      const result = await TestDatabaseService.pipe(
        Effect.andThen(srv => srv.getTableData(databaseName, tableName)),
        Effect.catchTags({
          'MySQL/Connection/Error': error => {
            return Effect.fail(
              new ErrorService(500, 'Failed to connect to the database', {
                error,
              })
            )
          },
          'Task/GetTableData/DatabaseNotAllowed/Error': error => {
            return Effect.fail(
              new ErrorService(403, 'Database not allowed', { error })
            )
          },
          'Task/GetTableData/Error': error => {
            return Effect.fail(
              new ErrorService(400, 'Failed to fetch table data', { error })
            )
          },
        }),
        TestDatabaseRuntime.runPromiseExit
      ).then(EffectHelpers.getDataOrThrowRawError)

      return {
        result,
        success: true,
      }
    },
    {
      detail: {
        description: 'Fetches data from a specific table in a database.',
        summary: 'Get table data',
      },
      params: TypeBox(handlerSchema.getTableData.params),
    }
  )
