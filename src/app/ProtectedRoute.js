"use client";
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, usePathname } from 'next/navigation';
import Loader from './component/Loader';

const PROTECTED_ROUTES = ['/profile', '/admin', '/orders', '/wishlist']; // Add validation routes here
const AUTH_ROUTES = ['/login', '/signup'];

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
                router.push('/login');
            } else if (isAuthenticated && AUTH_ROUTES.includes(pathname)) {
                router.push('/');
            }
        }
    }, [isAuthenticated, isLoading, router, pathname]);

    // Show loader while checking auth state on protected routes
    if (isLoading) {
        return <Loader />;
    }

    // If not authenticated and trying to access protected route, render nothing (or loader) until redirect happens
    if (!isAuthenticated && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
        return <Loader />;
    }

    return children;
}
