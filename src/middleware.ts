import { authorization, middlewares } from './middlewares'

export default middlewares([authorization])

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon|images|icon|logo|browserconfig|sitemap|robots|manifest).*)',
  ],
}
