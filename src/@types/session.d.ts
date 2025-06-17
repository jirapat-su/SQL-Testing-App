/* eslint-disable ts/consistent-type-definitions */
import type { auth } from '@/src/libs/better-auth/server'

type Session = Awaited<ReturnType<typeof auth.api.getSession>>

declare global {
  namespace Vike {
    interface PageContext {
      session: Session
    }
  }
}

export {}
