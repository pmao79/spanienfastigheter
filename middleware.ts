import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import type { NextFetchEvent, NextRequest } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const isAdminRoute = createRouteMatcher(['/admin(.*)']);

const isPortalRoute = createRouteMatcher(['/portal(.*)']);

const clerk = clerkMiddleware(async (auth, req) => {
    if (isAdminRoute(req) || isPortalRoute(req)) {
        await auth.protect();
    }
});

export default function middleware(req: NextRequest, event: NextFetchEvent) {
    if (isAdminRoute(req) || isPortalRoute(req)) {
        return clerk(req, event);
    }
    return intlMiddleware(req);
}

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};
