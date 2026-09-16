import NextAuth from 'next-auth';

import authConfig from './auth.config';

const { auth } = NextAuth(authConfig);

const privateRoutes = ['/', '/planned', '/completed'];
const authRoutes = ['/signin', 'sign-up'];

export default auth(async (req) => {
  const isLoggedIn = !!req.auth;
  const { nextUrl } = req;
  const url = 'http://localhost:3000';
  const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isApiRoute = nextUrl.pathname.includes('/api');

  if (isApiRoute) {
    return;
  }

  if (isLoggedIn && isAuthRoute) {
    return Response.redirect(`${url}/`);
  }
  if (!isLoggedIn && isAuthRoute) {
    return;
  }
  if (!isLoggedIn && isPrivateRoute) {
    return Response.redirect(`${url}/signin`);
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
