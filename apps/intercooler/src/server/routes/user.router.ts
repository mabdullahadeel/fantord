import { createRouter } from "../createRouter";
import * as trpc from "@trpc/server";
import { updateFtdProfilePrefSchema } from "../schema/user.schema";

export const userRouter = createRouter()
  .query("get-user-guilds", {
    resolve: async ({ ctx }) => {
      try {
        const userGuilds = await ctx.prisma.user.findFirst({
          where: {
            id: ctx.req.user?.sub,
          },
          include: {
            guilds: {
              where: {
                ownerId: ctx.req.user?.sub,
              },
            },
          },
        });
        return userGuilds?.guilds;
      } catch (error) {
        throw new trpc.TRPCError({
          code: "BAD_REQUEST",
          message:
            "Could not find your guilds. Try logging out and logging back in.",
        });
      }
    },
  })
  .query("get-ftd-profile-preferences", {
    resolve: async ({ ctx }) => {
      try {
        const userPreferences =
          await ctx.prisma.fantordProfilePreferences.findFirst({
            where: {
              user: {
                id: ctx.req.user?.sub,
              },
            },
          });
        if (!userPreferences) {
          const newUserPreferences =
            await ctx.prisma.fantordProfilePreferences.create({
              data: {
                user: {
                  connect: {
                    id: ctx.req.user?.sub,
                  },
                },
              },
            });
          return newUserPreferences;
        }
        return userPreferences;
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    },
  })
  .mutation("update-ftd-profile-preferences", {
    input: updateFtdProfilePrefSchema,
    resolve: async ({ ctx, input }) => {
      try {
        const userPreferences =
          await ctx.prisma.fantordProfilePreferences.update({
            where: {
              userId: ctx.req.user?.sub,
            },
            data: input,
          });
        return userPreferences;
      } catch (error) {
        throw new trpc.TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong",
        });
      }
    },
  });
