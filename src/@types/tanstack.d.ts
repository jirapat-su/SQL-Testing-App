/* eslint-disable ts/consistent-type-definitions */
import type { AxiosError } from 'axios'

import type { HTTP_STATUS } from '@/src/utils/http-status'

type APIError = {
  message: string
  'request-id': string
  status: keyof typeof HTTP_STATUS
  success: boolean
}

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<APIError>
  }
}
