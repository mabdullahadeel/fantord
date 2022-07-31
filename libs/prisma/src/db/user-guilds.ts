import { DiscordUserGuilds } from "@fantord/datalink";
import { Account } from "next-auth";
import { FantordUser } from "types";
import { prisma as prismaClient } from "./prisma-client";

export const addUserGuilds = async ({
  user,
  guilds,
  account,
}: {
  user: FantordUser;
  guilds: DiscordUserGuilds[];
  account: Account;
}) => {
  try {
    guilds.forEach(async (guild) => {
      await prismaClient.guilds.create({
        data: {
          discordGuildId: guild.id,
          name: guild.name,
          icon: guild.icon,
          permissions: guild.permissions,
          ownerId: guild.owner ? user.id : null,
          ownerDiscordId: guild.owner ? account.providerAccountId : null,
          members: {
            connect: {
              id: user.id,
            },
          },
        },
      });
    });
  } catch (err) {
    return Promise.reject(err);
  }
};

export const patchUserGuilds = async ({
  user,
  guilds,
  account,
}: {
  user: FantordUser;
  guilds: DiscordUserGuilds[];
  account: Account;
}) => {
  try {
    const userGuilds = await prismaClient.guilds.findMany({
      where: {
        members: {
          some: {
            id: user.id,
          },
        },
      },
      select: {
        discordGuildId: true,
        ownerId: true,
      },
    });
    const userGuildIdList = userGuilds.reduce(
      (total, current) => total.concat(current.discordGuildId),
      [] as string[]
    );

    const newGuilds: DiscordUserGuilds[] = [];
    const leftGuildIds: string[] = [];
    const deletedGuildIds: string[] = [];

    guilds.forEach((guilds) => {
      if (!userGuildIdList.includes(guilds.id)) {
        newGuilds.push(guilds);
      }
    });

    userGuilds.forEach((g) => {
      const idx = guilds.findIndex((guild) => guild.id === g.discordGuildId);
      if (idx === -1) {
        if (g.ownerId === user.id) {
          deletedGuildIds.push(g.discordGuildId);
        } else {
          leftGuildIds.push(g.discordGuildId);
        }
      }
    });

    if (newGuilds.length > 0) {
      await addUserGuilds({ user, guilds: newGuilds, account });
    }

    if (deletedGuildIds.length > 0) {
      await prismaClient.guilds.deleteMany({
        where: {
          discordGuildId: {
            in: leftGuildIds,
          },
        },
      });
    }

    if (leftGuildIds.length > 0) {
      leftGuildIds.forEach(
        async (gid) =>
          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              guilds: {
                disconnect: {
                  discordGuildId: gid,
                },
              },
            },
          })
      );
    }
  } catch (err) {
    Promise.reject(err);
  }
};
