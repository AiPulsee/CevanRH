import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as any)?.role;

      if (nextUrl.pathname.startsWith("/dashboard")) {
        if (!isLoggedIn) return false;
        // Permite acesso se for EMPLOYER ou ADMIN
        return role === "EMPLOYER" || role === "ADMIN";
      }

      if (nextUrl.pathname.startsWith("/admin")) {
        if (!isLoggedIn) return false;
        return role === "ADMIN";
      }

      return true;
    },
    async jwt({ token, user }) {
      // Quando o usuário loga, o objeto 'user' contém os dados do banco
      if (user) {
        token.role = (user as any).role;
        token.companyId = (user as any).companyId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).role = token.role;
        (session.user as any).companyId = token.companyId;
      }
      return session;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
