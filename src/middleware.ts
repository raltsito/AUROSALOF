import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET   = new TextEncoder().encode(
  process.env.JWT_SECRET ?? 'dev_secret_reemplazar_en_produccion'
)
const COOKIE_NAME  = 'aruosal_session'
const PUBLIC_PATHS = ['/login', '/register', '/consent']
const API_AUTH     = ['/api/auth']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Rutas publicas y assets
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/auth') ||
    pathname === '/favicon.ico' ||
    PUBLIC_PATHS.some(p => pathname.startsWith(p))
  ) {
    return NextResponse.next()
  }

  const token = request.cookies.get(COOKIE_NAME)?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    await jwtVerify(token, JWT_SECRET)
    return NextResponse.next()
  } catch {
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete(COOKIE_NAME)
    return response
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
