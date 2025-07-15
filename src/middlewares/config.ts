import type { NextMiddleware } from 'next/server'

import { NextResponse } from 'next/server'

function middlewares(
  functions: MiddlewareFactory[] = [],
  index = 0
): NextMiddleware {
  const current = functions[index]
  const response = NextResponse.next()

  if (current) {
    const next = middlewares(functions, index + 1)
    return current(next)
  }

  return () => response
}

export { middlewares }
