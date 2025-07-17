import type { PoolConnection, QueryResult } from 'mysql2/promise'

import { Effect } from 'effect'
import mysqlLib from 'mysql2/promise'

import { mysqlPoolConfig } from '@/src/libs/mysql'

import { MySQLConnectionError, MySQLQueryError } from './mysql.error'

export class MySQLProvider extends Effect.Service<MySQLProvider>()(
  'Provider/MySQL',
  {
    dependencies: [],
    effect: Effect.gen(function* () {
      const getConnectionWithOperation = <A, E>(
        databaseName: string,
        operation: (connection: PoolConnection) => Effect.Effect<A, E>
      ): Effect.Effect<A, E | MySQLConnectionError> =>
        Effect.acquireUseRelease(
          // Acquire connection
          Effect.tryPromise({
            catch: e => MySQLConnectionError.new()(e),
            try: async () => {
              const poolConfig: mysqlLib.PoolOptions = {
                ...mysqlPoolConfig,
                database: databaseName,
              }
              const pool = mysqlLib.createPool(poolConfig)
              const connection = await pool.getConnection()
              return connection
            },
          }),
          // Use connection
          connection => operation(connection),
          // Release connection
          connection =>
            Effect.sync(() => {
              connection.release()
            })
        )

      const query = (
        databaseName: string,
        sql: string
      ): Effect.Effect<QueryResult, MySQLConnectionError | MySQLQueryError> =>
        getConnectionWithOperation(databaseName, connection =>
          Effect.tryPromise({
            catch: e => MySQLQueryError.new(sql)(e),
            try: async () => {
              const [results] = await connection.execute(sql)
              return results
            },
          })
        )

      return {
        getConnectionWithOperation,
        query,
      }
    }),
  }
) {}
