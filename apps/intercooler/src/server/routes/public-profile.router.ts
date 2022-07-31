import { createRouter } from "../createRouter";
import z from "zod";
import * as trpc from "@trpc/server";

export const userPublicProfileRouter = createRouter().query(
  "get-user-public-profile",
  {
    input: z.object({
      userDiscordId: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
      try {
        const userPreferences =
          await ctx.prisma.fantordProfilePreferences.findFirst({
            where: {
              user: {
                accounts: {
                  providerAccountId: input.userDiscordId,
                },
              },
            },
          });
        if (!userPreferences) throw new Error("Missing user preferences");

        const profileIsPublic = userPreferences.showPublic;
        const guildsArePublic = userPreferences.showGuilds;

        const publicProfile = await ctx.prisma.user.findFirst({
          where: {
            accounts: {
              providerAccountId: input.userDiscordId,
            },
            profilePreferences: {
              showPublic: true,
            },
          },
          select: {
            guilds: true,
            id: true,
            image: true,
            name: true,
            accounts: {
              select: {
                providerAccountId: true,
              },
            },
            discordProfile: {
              select: {
                username: true,
                discriminator: true,
              },
            },
          },
        });
        return {
          guildsArePublic,
          profileIsPublic,
          publicProfile,
        };
      } catch (_error) {
        console.log(_error);
        throw new trpc.TRPCError({
          code: "NOT_FOUND",
          message: "Invalid Discord Account Id",
        });
      }
    },
  }
);
