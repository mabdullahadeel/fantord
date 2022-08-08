import { router } from "@trpc/server";
import * as trpc from "@trpc/server";
import superjson from "superjson";
import { Context } from "./createContext";
import { getUserFromRequest } from "./utils/jwt";

export function createRouter() {
  return router<Context>().transformer(superjson);
}

export function createProtectedRouter() {
  return router<Context>()
    .transformer(superjson)
    .middleware(async ({ ctx, next }) => {
      try {
        const user = await getUserFromRequest(ctx.req);
        ctx.req.user = user;
      } catch (error) {
        throw new trpc.TRPCError({
          code: "UNAUTHORIZED",
          message: "No authentication credentials were provided",
          cause: error,
        });
      }
      return next();
    });
}
