import { verifySession } from '@/app/lib/dal'
import { NextResponse, NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await verifySession()
  if (session.isAuth === true && request.url.includes("/login")) {
    return NextResponse.redirect(new URL(`/profile/${session.userId}`, request.url))
  }
  else if (session.isAuth === false && request.url.includes("/login")) {
    return NextResponse.next()
  }
  if (session.isAuth === true && request.url.includes('/profile')) {
    return NextResponse.next()
  }
  else if (session.isAuth === false && request.url.includes("/profile")) {
    return NextResponse.redirect(new URL(`/login`, request.url))
  }
}

export const config = {
  matcher: ['/login', '/profile/:path*']
}
