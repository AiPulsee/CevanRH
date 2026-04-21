import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        // MOCK LOGIN: Apenas para desenvolvimento
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (user) {
          // Garante que o objeto user tenha os campos necessários para o JWT callback em auth.config.ts
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            companyId: user.companyId,
          };
        }
        return null;
      },
    }),
  ],
});
