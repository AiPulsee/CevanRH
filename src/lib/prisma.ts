import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prismaBase: PrismaClient | undefined;
};

const baseClient =
  globalForPrisma.prismaBase ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    datasources: { db: { url: process.env.DATABASE_URL } },
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prismaBase = baseClient;

// Exported for PrismaAdapter — the adapter expects PrismaClient, not the extended type
export const prismaAdapter = baseClient;

// Extended client: auto-filters soft-deleted records on findMany/findFirst/count.
// Inside $transaction, `tx` is the raw client — add `deletedAt: null` manually there.
export const prisma = baseClient.$extends({
  query: {
    job: {
      findMany({ args, query }) { args.where = { deletedAt: null, ...args.where }; return query(args); },
      findFirst({ args, query }) { args.where = { deletedAt: null, ...args.where }; return query(args); },
      count({ args, query }) { args.where = { deletedAt: null, ...args.where }; return query(args); },
    },
    user: {
      findMany({ args, query }) { args.where = { deletedAt: null, ...args.where }; return query(args); },
      findFirst({ args, query }) { args.where = { deletedAt: null, ...args.where }; return query(args); },
    },
    company: {
      findMany({ args, query }) { args.where = { deletedAt: null, ...args.where }; return query(args); },
      findFirst({ args, query }) { args.where = { deletedAt: null, ...args.where }; return query(args); },
    },
  },
});
