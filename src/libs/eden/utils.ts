import { Effect } from 'effect'

import type { HTTP_STATUS } from '@/src/constants/http-status'
import type { ErrorService } from '@/src/utils/error-service'

export type TreatyError = {
  status: number
  value: {
    detail?: ErrorService
    message: string
    'request-id': string
    status: keyof typeof HTTP_STATUS
    success: boolean
  }
}

type TreatyResponse<T> = {
  data?: T
  error?: unknown
}

export const createEffectFromTreaty = <T>(
  promiseFn: () => Promise<TreatyResponse<T>>
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
