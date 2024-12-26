import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma';
import { loginFormSchema } from '@/utils';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validateData = loginFormSchema.safeParse(credentials);
        if (!validateData.success) return null;
        const { email, password } = validateData.data;
        const user = await prisma.user.findFirst({
          where: { email },
        });
        if (!user || !user.hashedPassword || !user.email) return null;
        const isPasswordCorrect = await bcrypt.compare(
          password,
          user.hashedPassword
        );
        if (isPasswordCorrect) return user;
        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
