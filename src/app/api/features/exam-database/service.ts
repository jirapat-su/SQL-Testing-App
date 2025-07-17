import type { QueryResult, ResultSetHeader } from 'mysql2'

import { Effect, pipe } from 'effect'

import { MySQLProvider } from '../../providers/mysql'
import { CommandQueryError, DatabaseNotAllowedError } from './service.error'
import { checkSelectQuery } from './utils'

const ALLOW_DATABASE_NAMES = ['Hospital']

type CommandQueryResult = {
  action?: ResultSetHeader
  affter?: QueryResult
  before?: QueryResult
}

const dbValidation = (databaseName: string) =>
  Effect.async<string, DatabaseNotAllowedError>(resume => {
    if (!ALLOW_DATABASE_NAMES.includes(databaseName)) {
      resume(
        Effect.fail(
          DatabaseNotAllowedError.new(databaseName)(
            `Database ${databaseName} is not allowed.`
          )
        )
      )
    } else {
      resume(Effect.succeed(databaseName))
    }
  })

export class ExamDatabaseService extends Effect.Service<ExamDatabaseService>()(
  'Feature/ExamDatabase/Service',
  {
    dependencies: [MySQLProvider.Default],
    effect: Effect.gen(function* () {
      const { getConnectionWithOperation, query } = yield* MySQLProvider

      const getAllDatabase = () => {
        const SQL_COMMAND = 'SHOW TABLES;'
        const data = new Map<string, string[]>()

        return Effect.gen(function* () {
          for (const databaseName of ALLOW_DATABASE_NAMES) {
            const rows = yield* query(databaseName, SQL_COMMAND)

            const tableNames = Array.isArray(rows)
              ? rows
                  .map(val => Object.values(val)[0] as string)
                  .filter(t => t !== '_prisma_migrations')
              : []

            data.set(databaseName, tableNames)
          }

          return Array.from(data.entries()).map(([key, values]) => ({
            [key]: values,
          }))
        })
      }

      const getTableData = (databaseName: string, tableName: string) => {
        const SQL_COMMAND = `SELECT * FROM \`${tableName}\`;`

        return pipe(
          dbValidation(databaseName),
          Effect.andThen(dbName => {
            const rows = query(dbName, SQL_COMMAND)
            return rows
          })
        )
      }

      const commandQuery = (databaseName: string, sqlCommand: string) => {
        if (!sqlCommand.trim()) {
          return Effect.fail(
            CommandQueryError.new()('SQL command cannot be empty.')
          )
        }

        return Effect.gen(function* () {
          // Validate database name
          yield* dbValidation(databaseName)

          // Check if the command is a SELECT query
          const isSelectQuery = checkSelectQuery(sqlCommand)

          const rows = yield* getConnectionWithOperation(
            databaseName,
            connection => {
              // For SELECT queries, we can execute directly without transaction
              if (isSelectQuery) {
                return Effect.tryPromise({
                  catch: error => CommandQueryError.new()(error),
                  try: async () => {
                    // Always return [QueryResult, FieldPacket[]]
                    const [result] = await connection.execute(sqlCommand)

                    return {
                      action: undefined,
                      affter: result,
                      before: undefined,
                    } satisfies CommandQueryResult
                  },
                })
              }

              // For non-SELECT queries, we need to handle transactions
              return Effect.tryPromise({
                catch: error => CommandQueryError.new()(error),
                try: async () => {
                  // Begin transaction
                  await connection.beginTransaction()

                  const result: CommandQueryResult = {
                    action: undefined,
                    affter: undefined,
                    before: undefined,
                  }

                  const tableMatch = sqlCommand.match(
                    /(?:from|into|update)\s+`?(\w+)`?/i
                  )

                  // Get data before execution
                  if (tableMatch && tableMatch[1]) {
                    const tableName = tableMatch[1]
                    const [beforeResult] = await connection.execute(
                      `SELECT * FROM \`${tableName}\` LIMIT 100`
                    )
                    result.before = beforeResult
                  }

                  // Execute the command
                  const [actionResult] =
                    await connection.execute<ResultSetHeader>(sqlCommand)
                  result.action = actionResult

                  // Get data after execution
                  if (tableMatch && tableMatch[1]) {
                    const tableName = tableMatch[1]
                    const [affterResult] = await connection.execute(
                      `SELECT * FROM \`${tableName}\` LIMIT 100`
                    )
                    result.affter = affterResult
                  }

                  // Rollback transaction
                  await connection.rollback()

                  return result satisfies CommandQueryResult
                },
              })
            }
          )

          return rows
        })
      }

      return {
        commandQuery,
        getAllDatabase,
        getTableData,
      }
    }),
  }
) {}
