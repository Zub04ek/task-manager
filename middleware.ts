import NextAuth from 'next-auth';

import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

const privateRoutes = ['/', '/planned', '/completed'];
const authRoutes = ['/signin', '/sign-up'];

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;

  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (!isLoggedIn && isAuthRoute) {
    return;
  }

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(new URL('/', nextUrl));
  }

  if (!isLoggedIn && isPrivateRoute) {
    return Response.redirect(new URL('/signin', nextUrl));
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
