import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as any)?.role;

      if (nextUrl.pathname.startsWith("/admin")) {
        if (!isLoggedIn) return false;
        if (role !== "ADMIN") return false;

        const permissions = (auth?.user as any)?.permissions || [];
        const path = nextUrl.pathname;

        // Se for admin raiz (/) pode entrar
        if (path === "/admin") return true;

        // Mapeamento de abas
        if (path.startsWith("/admin/managed") && !permissions.includes("MANAGED")) return false;
        if (path.startsWith("/admin/resumes") && !permissions.includes("RESUMES")) return false;
        if (path.startsWith("/admin/companies") && !permissions.includes("COMPANIES")) return false;
        if (path.startsWith("/admin/placements") && !permissions.includes("PLACEMENTS")) return false;
        if (path.startsWith("/admin/analytics") && !permissions.includes("ANALYTICS")) return false;
        if (path.startsWith("/admin/finance") && !permissions.includes("FINANCE")) return false;
        if (path.startsWith("/admin/users") && !permissions.includes("USERS")) return false;
        if (path.startsWith("/admin/settings") && !permissions.includes("SETTINGS")) return false;

        return true;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.companyId = (user as any).companyId;
        token.permissions = (user as any).permissions ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).role = token.role;
        (session.user as any).companyId = token.companyId;
        (session.user as any).permissions = token.permissions ?? null;
      }
      return session;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
