import { Effect } from 'effect'

import { httpClient } from '@/src/libs/eden'
import { EffectHelpers } from '@/src/libs/effect'

type ApiResponse<T> = {
  data?: T
  error?: unknown
}

const createEffectFromPromise = <T>(
  promiseFn: () => Promise<ApiResponse<T>>
) => {
  return Effect.tryPromise({
    catch: error => ({ error }),
    try: promiseFn,
  }).pipe(
    Effect.andThen(({ data, error }) => {
      if (error) return Effect.fail(error)
      return Effect.succeed(data)
    })
  )
}

const runEffectTask = async <A, E>(effect: Effect.Effect<A, E>) => {
  const exit = await Effect.runPromiseExit(effect)
  return EffectHelpers.getDataOrThrowRawError(exit)
}

export const getDatabase = () => {
  const http = httpClient.api['exam-database']
  const task = createEffectFromPromise(() => http.get())
  return runEffectTask(task)
}

export const getTableData = (databaseName: string, tableName: string) => {
  const http = httpClient.api['exam-database']
  const task = createEffectFromPromise(() =>
    http({ databaseName })({ tableName }).get()
  )
  return runEffectTask(task)
}

export const runCommandQuery = (databaseName: string, sqlCommand: string) => {
  const http = httpClient.api['exam-database']['command-query']
  const task = createEffectFromPromise(() =>
    http.post({ databaseName, sqlCommand })
  )
  return runEffectTask(task)
}
