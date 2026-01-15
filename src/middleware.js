import { NextResponse } from 'next/server';

export function middleware(request) {
    // Check for auth token in cookies (real world) or just bypass for now since Redux is client-side.
    // BUT: Middleware runs on server edge. accessing localStorage or Redux state is impossible directly.
    // Strategy: For a real app, we'd use HTTP-only cookies.
    // For this mock simplified app where state is in Redux (localStorage), middleware can't effectively protect routes based on client state.
    // We must protect routes on the client side (in a layout wrapper or HOC) OR set a cookie on login.

    // For this implementation, I'll rely on CLIENT-SIDE protection in the layouts/pages (like I added in login/signup pages redirecting if authenticated).
    // AND I will add a client-side protection wrapper component for protected pages.

    // However, I'll add a dummy middleware to allow everything for now, 
    // or I can implement a rudimentary cookie check if I set cookies on login.

    // Let's stick to Client-Side Protection for this Redux-based mock.
    // I will create a ProtectedRoute component instead.

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};
