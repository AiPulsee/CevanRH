import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: Role;
      companyId?: string;
    } & DefaultSession["user"];
  }
}
