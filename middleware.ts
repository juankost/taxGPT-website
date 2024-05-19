import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware, redirectToLogin } from 'next-firebase-auth-edge'
import { authConfig } from './config/server-config'
import { nanoid } from '@/lib/utils'

const PUBLIC_PATHS = [
  '/register',
  '/login',
  '/reset-password',
  '/privacy-policy',
  '/terms-of-service'
]

export async function middleware(request: NextRequest) {
  return authMiddleware(request, {
    loginPath: '/api/login',
    logoutPath: '/api/logout',
    apiKey: authConfig.apiKey,
    cookieName: authConfig.cookieName,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    serviceAccount: authConfig.serviceAccount,
    debug: false,
    checkRevoked: true,
    handleValidToken: async ({ token, decodedToken }, headers) => {
      if (
        PUBLIC_PATHS.includes(request.nextUrl.pathname) ||
        request.nextUrl.pathname === '/'
      ) {
        const url = request.nextUrl.clone()
        const id = nanoid()
        url.pathname = `/chat/${id}`
        return NextResponse.redirect(url)
      }
      return NextResponse.next({
        request: {
          headers
        }
      })
    },
    handleInvalidToken: async reason => {
      if (
        PUBLIC_PATHS.includes(request.nextUrl.pathname) ||
        request.nextUrl.pathname === '/'
      ) {
        return NextResponse.next() // no need to authenticate and can go to homepage
      }
      console.info('Missing or malformed credentials', { reason })
      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS
      })
    },
    handleError: async error => {
      console.error('Unhandled authentication error', { error })
      return redirectToLogin(request, {
        path: '/login',
        publicPaths: PUBLIC_PATHS
      })
    }
  })
}

export const config = {
  matcher: [
    '/api/login',
    '/api/logout',
    '/',
    '/((?!_next|favicon.ico|api|.*\\.).*)'
  ]
}
