import { Duration, Effect } from 'effect'

import { MySQLProvider } from '@/src/libs/mysql'

import {
  DatabaseNotAllowedError,
  GetAllDatabaseError,
  GetTableDataError,
} from './service.error'

const ALLOW_DATABASE_NAMES = ['Hospital']

export class TestDatabaseService extends Effect.Service<TestDatabaseService>()(
  'Feature/TestDatabase/Service',
  {
    dependencies: [MySQLProvider.Default],
    effect: Effect.gen(function* () {
      const { getConnection } = yield* MySQLProvider

      const getAllDatabase = () => {
        return Effect.gen(function* () {
          const SQL_COMMAND = 'SHOW TABLES;'
          const data = new Map<string, string[]>()

          for (const database_name of ALLOW_DATABASE_NAMES) {
            const connection = yield* getConnection(database_name)

            const [rows] = yield* Effect.tryPromise({
              catch: error => GetAllDatabaseError.new()(error),
              try: () => connection.execute(SQL_COMMAND),
            })
            connection.release()

            const tableNames = Array.isArray(rows)
              ? rows
                  .map(val => Object.values(val)[0] as string)
                  .filter(t => t !== '_prisma_migrations')
              : []

            data.set(database_name, tableNames)
          }

          return Array.from(data.entries()).map(([key, values]) => ({
            [key]: values,
          }))
        }).pipe(Effect.timeout(Duration.seconds(5)))
      }

      const getTableData = (databaseName: string, tableName: string) => {
        if (!ALLOW_DATABASE_NAMES.includes(databaseName)) {
          return Effect.fail(
            DatabaseNotAllowedError.new()(
              `Database ${databaseName} is not allowed.`
            )
          )
        }

        return Effect.gen(function* () {
          const connection = yield* getConnection(databaseName)

          const [rows] = yield* Effect.tryPromise({
            catch: error => GetTableDataError.new()(error),
            try: () => connection.execute(`SELECT * FROM \`${tableName}\``),
          })
          connection.release()

          return rows
        }).pipe(Effect.timeout(Duration.seconds(5)))
      }

      return {
        getAllDatabase,
        getTableData,
      }
    }),
  }
) {}
