import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as any)?.role;

      if (nextUrl.pathname === "/login" && isLoggedIn && role === "ADMIN") {
        return Response.redirect(new URL("/admin", nextUrl));
      }

      if (nextUrl.pathname.startsWith("/admin")) {
        if (!isLoggedIn) return false;
        if (role !== "ADMIN") return false;

        const permissions = (auth?.user as any)?.permissions;
        const path = nextUrl.pathname;

        // null = master admin, acesso total
        if (permissions === null || permissions === undefined) return true;

        const perms: string[] = Array.isArray(permissions) ? permissions : [];

        if (path === "/admin") return true;
        if (path.startsWith("/admin/managed") && !perms.includes("MANAGED")) return false;
        if (path.startsWith("/admin/resumes") && !perms.includes("RESUMES")) return false;
        if (path.startsWith("/admin/companies") && !perms.includes("COMPANIES")) return false;
        if (path.startsWith("/admin/placements") && !perms.includes("PLACEMENTS")) return false;
        if (path.startsWith("/admin/analytics") && !perms.includes("ANALYTICS")) return false;
        if (path.startsWith("/admin/finance") && !perms.includes("FINANCE")) return false;
        if (path.startsWith("/admin/users") && !perms.includes("USERS")) return false;
        if (path.startsWith("/admin/settings") && !perms.includes("SETTINGS")) return false;

        return true;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.companyId = (user as any).companyId;
        token.permissions = (user as any).permissions ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).companyId = token.companyId;
        (session.user as any).permissions = token.permissions ?? null;
      }
      return session;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
