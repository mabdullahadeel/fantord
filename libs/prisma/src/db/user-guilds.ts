import { DiscordUserGuilds } from "@fantord/datalink";
import { FantordUser } from "types";
import { prisma as prismaClient } from "./prisma-client";
import { generateGuildPayload } from "./utils";

export const addUserGuilds = async ({
  user,
  guilds,
}: {
  user: FantordUser;
  guilds: DiscordUserGuilds[];
}) => {
  try {
    const payload = generateGuildPayload(guilds, user);
    await prismaClient.userGuilds.createMany({
      data: [...payload],
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const patchUserGuilds = async ({
  user,
  guilds,
}: {
  user: FantordUser;
  guilds: DiscordUserGuilds[];
}) => {
  try {
    const userGuidlIds = await prismaClient.userGuilds.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
      select: {
        discordGuildId: true,
      },
    });
    const userGuildIdList = userGuidlIds.reduce(
      (total, current) => total.concat(current.discordGuildId),
      [] as string[]
    );

    const newGuilds: DiscordUserGuilds[] = [];
    const leftGuildIds: string[] = [];

    guilds.forEach((guilds) => {
      if (!userGuildIdList.includes(guilds.id)) {
        newGuilds.push(guilds);
      }
    });

    userGuildIdList.forEach((guildId) => {
      const userLeftGuild = guilds.find((guild) => guild.id === guildId);
      if (!userLeftGuild) {
        leftGuildIds.push(guildId);
      }
    });

    if (newGuilds.length > 0) {
      await addUserGuilds({ user, guilds: newGuilds });
    }

    if (leftGuildIds.length > 0) {
      await prismaClient.userGuilds.deleteMany({
        where: {
          discordGuildId: {
            in: leftGuildIds,
          },
        },
      });
    }
  } catch (err) {
    Promise.reject(err);
  }
};
