import type { NextFetchEvent, NextMiddleware, NextRequest } from 'next/server'

import { getSessionCookie } from 'better-auth/cookies'
import { NextResponse } from 'next/server'
import { cache } from 'react'

const isPublicRoutes = cache((route: string): boolean => {
  const publicRoutes = ['/sign-in']

  return publicRoutes.some(
    publicRoute => route.endsWith(publicRoute) && publicRoute.length > 0
  )
})

const handleUnauthorized = cache((request: NextRequest): NextResponse => {
  const redirectUrl = new URL('/sign-in', request.url)
  const currentPath = request.nextUrl.pathname
  const searchParams = request.nextUrl.searchParams.toString()
  const redirectPath = searchParams
    ? `${currentPath}?${searchParams}`
    : currentPath
  redirectUrl.searchParams.set(
    '__redirect_url',
    encodeURIComponent(redirectPath)
  )
  return NextResponse.redirect(redirectUrl)
})

const authorization: MiddlewareFactory = (nextMW: NextMiddleware) => {
  return async (request: NextRequest, nextFE: NextFetchEvent) => {
    if (isPublicRoutes(request.nextUrl.pathname)) return nextMW(request, nextFE)

    const sessionCookie = getSessionCookie(request, { cookiePrefix: 'auth' })
    if (!sessionCookie) return handleUnauthorized(request)
  }
}

export { authorization }
