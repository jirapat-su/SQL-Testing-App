/* eslint-disable ts/consistent-type-definitions */
import type { TreatyError } from '@/src/libs/eden/utils'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: TreatyError
  }
}
