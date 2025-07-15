/* eslint-disable ts/consistent-type-definitions */
import type { HTTP_STATUS } from '@/src/constants/http-status'

import type { ErrorService } from '../utils/error-service'

type APIError = {
  status: number
  value: {
    detail?: ErrorService
    message: string
    'request-id': string
    status: keyof typeof HTTP_STATUS
    success: boolean
  }
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: APIError
  }
}
