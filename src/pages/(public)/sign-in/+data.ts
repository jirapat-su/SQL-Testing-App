import type { AuthProvider } from '@toolpad/core/SignInPage'
import type { PageContextServer } from 'vike/types'

import { env } from '@/src/env'

export type Data = Awaited<ReturnType<typeof data>>

export async function data(_pageContext: PageContextServer) {
  const authProviders: AuthProvider[] = [
    { id: 'google', name: 'Google' },
    { id: 'github', name: 'GitHub' },
    ...(env.VERCEL === '1' ? [] : [{ id: 'credentials', name: 'Email and Password' }]),
  ]

  return { authProviders }
}
