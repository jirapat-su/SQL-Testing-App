import type { NextMiddleware } from 'next/server'

declare global {
  type MiddlewareFactory = (middleware: NextMiddleware) => NextMiddleware
}

export {}
