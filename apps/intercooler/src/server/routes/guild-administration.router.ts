import z from "zod";
import { createRouter } from "../createRouter";
import * as trpc from "@trpc/server";

export const guildAdministration = createRouter()
  .query("get-current-state", {
    input: z.object({
      guildId: z.string().regex(/^[0-9]{18}$/),
    }),
    resolve: async ({ ctx, input }) => {
      try {
        const admnMeta = await ctx.prisma.guildAdministration.findFirst({
          where: {
            guildId: input.guildId,
          },
          include: {
            joinRoles: true,
          },
        });
        const roles = await ctx.prisma.roles.findMany({
          where: {
            guildId: input.guildId,
          },
        });
        return {
          roles,
          state: admnMeta,
        };
      } catch (error) {
        throw new trpc.TRPCError({
          code: "BAD_REQUEST",
          message:
            "Something went wrong while trying to get the guild administration settings",
        });
      }
    },
  })
  .mutation("update", {
    input: z.object({
      guildId: z.string().regex(/^[0-9]{18}$/),
      roles: z.array(
        z.object({
          id: z.string(),
        })
      ),
    }),
    resolve: async ({ ctx, input }) => {
      try {
        await ctx.prisma.guildAdministration.update({
          where: {
            guildId: input.guildId,
          },
          data: {
            joinRoles: {
              set: input.roles,
            },
          },
        });
        return {
          success: true,
        };
      } catch (error) {
        throw new trpc.TRPCError({
          code: "BAD_REQUEST",
          message:
            "Something went wrong while trying to update the guild administration settings",
        });
      }
    },
  });
