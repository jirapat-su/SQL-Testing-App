import { Data, Effect } from 'effect'

import { EffectHelpers } from '../effect'
import { mysql } from './config'

class MySQLConnectionError extends Data.TaggedError(
  'MySQL/Connection/Error'
)<EffectHelpers.ErrorMsg> {
  static new = EffectHelpers.createErrorFactory(this)
}

export class MySQLProvider extends Effect.Service<MySQLProvider>()(
  'Libs/MySQL',
  {
    dependencies: [],
    effect: Effect.gen(function* () {
      const getPool = (databaseName?: string) => mysql(databaseName)

      const getConnection = (databaseName?: string) =>
        Effect.tryPromise({
          catch: e => MySQLConnectionError.new()(e),
          try: async () => {
            const connection = await getPool(databaseName).getConnection()
            return connection
          },
        })

      return {
        getConnection,
      }
    }),
  }
) {}
