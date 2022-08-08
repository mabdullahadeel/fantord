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
        const guild = await ctx.prisma.guilds.findFirst({
          where: {
            id: input.guildId,
          },
        });
        if (!guild) {
          throw new trpc.TRPCError({
            code: "NOT_FOUND",
            message: "Guild not found",
          });
        }
        if (guild.ownerId !== ctx.req.user?.sub) {
          throw new trpc.TRPCError({
            code: "FORBIDDEN",
            message: "You are not allowed on this page",
          });
        }
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
        if (error instanceof trpc.TRPCError) throw error;
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
        const guild = await ctx.prisma.guilds.findFirst({
          where: {
            id: input.guildId,
          },
        });
        if (guild?.ownerId !== ctx.req.user?.sub) {
          throw new trpc.TRPCError({
            code: "FORBIDDEN",
            message: "You are not allowed on this page",
          });
        }
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
        if (error instanceof trpc.TRPCError) throw error;
        throw new trpc.TRPCError({
          code: "BAD_REQUEST",
          message:
            "Something went wrong while trying to update the guild administration settings",
        });
      }
    },
  });
