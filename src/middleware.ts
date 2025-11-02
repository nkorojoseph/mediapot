import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// const isProtectedRoute = createRouteMatcher(["/user-profile"]);
const isPublicRoute = createRouteMatcher(['/', '/signin(.*)', '/signup(.*)']);

const isAdminRoute = createRouteMatcher(['/admin(.*)', '/create-post(.*)']);

const isSignedInRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/create-posts(.*)',
  '/settings(.*)',
  '/admin(.*)',
  '/user-profile(.*)',
  '/trending(.*)',
  '/content-library(.*)',
  '/calendar-planner(.*)',
  '/analytics(.*)',
  '/posts(.*)',
  '/onboarding(.*)',
  '/user(.*)',
  '/content-leaderboard(.*)',
  '/analytics(.*)',
  '/trending-topics(.*)',
  '/calendar-planner(.*)',
  '/content-library(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  // If the user is trying to access an admin route, ensure they are an admin
  if (
    isAdminRoute(req) &&
    isSignedInRoute(req) &&
    (await auth()).sessionClaims?.metadata?.role !== 'admin'
  ) {
    const url = new URL('/', req.url);
    return NextResponse.redirect(url);
  }
  // If the user is not signed in and is trying to access a protected route, redirect them to the sign-in page
  if (!userId && !isPublicRoute(req)) {
    // Add custom logic to run before redirecting
    // logging user session info
    return redirectToSignIn();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
