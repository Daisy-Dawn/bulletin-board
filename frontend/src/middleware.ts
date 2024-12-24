import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
    const userid = req.cookies.get('userid')?.value
    const isLoginPage = req.nextUrl.pathname === '/auth/login'
    const isRegisterPage = req.nextUrl.pathname === '/auth/register'

    // If the user is not logged in and is not on the login or register page, redirect to login
    if (!userid && !isLoginPage && !isRegisterPage) {
        return NextResponse.redirect(new URL('/auth/login', req.url))
    }

    // If the user is logged in or they are on the login or register page, continue as normal
    return NextResponse.next()
}

// Apply middleware to all routes except login, register, and static assets
export const config = {
    matcher: ['/dashboard'], // Replace with the routes you want to protect
}
