import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import prisma from '@/lib/prisma';
import { loginFormSchema } from '@/utils';
import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from './auth.config';
import { getAccountByUserId, getUserById } from './data';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  ...authConfig,
  providers: [
    ...authConfig.providers,

    Credentials({
      async authorize(credentials) {
        const validateData = loginFormSchema.safeParse(credentials);

        if (!validateData.success) return null;

        const { email, password } = validateData.data;

        const user = await prisma.user.findFirst({
          where: { email },
        });

        if (!user || !user.hashedPassword || !user.email) {
          return null;
        }

        const isPasswordCorrect = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!isPasswordCorrect) return null;

        return user;
      },
    }),
  ],
  callbacks: {
    // async signIn({ user, account }) {
    //   if (account?.provider !== 'credentials') return true;
    //   const existingUser = await getUserById(user.id ?? '');
    //   if (!existingUser?.emailVerified) return false;
    //   return true;
    // },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      const existingAccount = await getAccountByUserId(existingUser.id);
      token.isOauth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.image = existingUser.image;
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          isOauth: token.isOauth,
        },
      };
    },
  },
});
