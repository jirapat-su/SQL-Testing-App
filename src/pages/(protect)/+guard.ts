import type { PageContextServer } from 'vike/types'

import { redirect } from 'vike/abort'

export async function guard(pageContext: PageContextServer) {
  if (!pageContext.session) {
    throw redirect(
      `/sign-in?redirect=${encodeURIComponent(pageContext.urlPathname)}`
    )
  }
}
