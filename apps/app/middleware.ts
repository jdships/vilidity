import { authMiddleware } from '@repo/auth/middleware';

export default authMiddleware({
  ignoredRoutes: ['/api/webhooks/clerk'],
  publicRoutes: ['/', '/sign-in', '/sign-up'],
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
