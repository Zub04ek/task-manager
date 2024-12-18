import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

import prisma from '@/lib/prisma';
import { connectToDatabase } from '@/utils';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.email || !credentials.password)
          return null;

        try {
          await connectToDatabase();
          const user = await prisma.user.findFirst({
            where: { email: credentials.email },
          });

          if (!user?.hashedPassword) {
            return null;
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );
          if (isPasswordCorrect) {
            return user;
          }
          return null;
        } catch (error) {
          console.log(error);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin', // Custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
