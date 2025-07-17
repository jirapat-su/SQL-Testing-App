import { Duration, Effect } from 'effect'
import Elysia from 'elysia'

import { EffectHelpers } from '@/src/libs/effect'
import { ErrorService } from '@/src/utils/error-service'

import { authorizationPlugin } from '../../plugins/authorization'
import { generateCacheKeyPlugin } from '../../plugins/gen-cache-key'
import { CacheProvider } from '../../providers/cache'
import { handlerSchema } from './schema'
import { ExamDatabaseService } from './service'
import { ExamDatabaseServiceRuntime } from './service.runtime'

export const examDatabaseRoute = new Elysia({
  detail: {
    tags: ['Exam Database'],
  },
  name: 'Exam Database Router',
  prefix: '/exam-database',
})
  .use(authorizationPlugin)
  .use(generateCacheKeyPlugin)
  // Get all databases
  .get(
    '/',
    async ({ cacheKey }) => {
      const result = await Effect.gen(function* () {
        const { getOrSet } = yield* CacheProvider
        const { getAllDatabase } = yield* ExamDatabaseService
        const result = yield* getOrSet(cacheKey, () => getAllDatabase())
        return result
      })
        .pipe(
          Effect.timeout(Duration.seconds(5)),
          Effect.catchTags({
            'Cache/Set/Error': error => {
              return Effect.fail(
                new ErrorService(500, 'Failed to set cache for databases', {
                  error,
                })
              )
            },
            'MySQL/Connection/Error': error => {
              return Effect.fail(
                new ErrorService(500, 'Failed to connect to the database', {
                  error,
                })
              )
            },
            'MySQL/Query/Error': error => {
              return Effect.fail(
                new ErrorService(400, 'Failed to fetch databases', { error })
              )
            },
            TimeoutException: error => {
              return Effect.fail(
                new ErrorService(408, 'Request timed out', { error })
              )
            },
          }),
          ExamDatabaseServiceRuntime.runPromiseExit
        )
        .then(EffectHelpers.getDataOrThrowRawError)

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
  // Get table data from a specific database
  .get(
    '/:databaseName/:tableName',
    async ({ cacheKey, params }) => {
      const { databaseName, tableName } = params

      const result = await Effect.gen(function* () {
        const { getOrSet } = yield* CacheProvider
        const { getTableData } = yield* ExamDatabaseService
        const result = yield* getOrSet(cacheKey, () =>
          getTableData(databaseName, tableName)
        )
        return result
      })
        .pipe(
          Effect.timeout(Duration.seconds(5)),
          Effect.catchTags({
            'MySQL/Connection/Error': error => {
              return Effect.fail(
                new ErrorService(500, 'Failed to connect to the database', {
                  error,
                })
              )
            },
            'MySQL/Query/Error': error => {
              return Effect.fail(
                new ErrorService(400, 'Failed to fetch table data', { error })
              )
            },
            'Task/DatabaseNotAllowed/Error': error => {
              return Effect.fail(
                new ErrorService(403, 'Database not allowed', { error })
              )
            },
            TimeoutException: error => {
              return Effect.fail(
                new ErrorService(408, 'Request timed out', { error })
              )
            },
          }),
          ExamDatabaseServiceRuntime.runPromiseExit
        )
        .then(EffectHelpers.getDataOrThrowRawError)

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
      params: handlerSchema.getTableData.params,
    }
  )
  // Execute a command query on a specific database
  .post(
    '/command-query',
    async ({ body }) => {
      const { databaseName, sqlCommand } = body

      const result = await Effect.gen(function* () {
        const { commandQuery } = yield* ExamDatabaseService
        const result = yield* commandQuery(databaseName, sqlCommand)
        return result
      })
        .pipe(
          Effect.timeout(Duration.seconds(5)),
          Effect.catchTags({
            'MySQL/Connection/Error': error => {
              return Effect.fail(
                new ErrorService(500, 'Failed to connect to the database', {
                  error,
                })
              )
            },
            'Task/CommandQuery/Error': error => {
              return Effect.fail(
                new ErrorService(
                  400,
                  typeof error?.error === 'object' &&
                  error?.error &&
                  'message' in error.error
                    ? (error.error as { message: string }).message
                    : 'Failed to execute command query',
                  {
                    error,
                  }
                )
              )
            },
            'Task/DatabaseNotAllowed/Error': error => {
              return Effect.fail(
                new ErrorService(403, 'Database not allowed', { error })
              )
            },
            TimeoutException: error => {
              return Effect.fail(
                new ErrorService(408, 'Request timed out', { error })
              )
            },
          }),
          ExamDatabaseServiceRuntime.runPromiseExit
        )
        .then(EffectHelpers.getDataOrThrowRawError)

      return {
        result,
        success: true,
      }
    },
    {
      body: handlerSchema.commandQuery.body,
      detail: {
        description: 'Executes a SQL command on a specified database.',
        summary: 'Execute command query',
      },
    }
  )
