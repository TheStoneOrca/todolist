import { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export default {
  providers: [
    credentials({
      async authorize(data: any) {
        const prisma = new PrismaClient();

        const user = await prisma.users.findUnique({
          where: { username: data.username },
        });

        if (user) {
          const checkPassword = await bcrypt.compare(
            data.password,
            user.password
          );

          if (checkPassword) {
            return {
              username: user.username,
              userid: user.userid,
              role: user.role,
            } as any;
          }

          return null;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
} satisfies NextAuthConfig;
