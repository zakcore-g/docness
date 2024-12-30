import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',
  '/login',
  '/register',
  '/api/public(.*)',
  '/templates/public(.*)'
]);

const isIgnoredRoute = createRouteMatcher([
  '/api/webhook(.*)'
]);

export default clerkMiddleware(async (auth, request) => {
  if (isIgnoredRoute(request)) {
    return;
  }
  
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};