import type { Account } from "next-auth";
import { FantordUser, DiscordProfileResponse } from "../types/auth.types";
import { prismaClient } from "./prisma-client";
import type { Prisma } from "@prisma/client";
import type { DiscordUserGuilds } from "@fantord/datalink";

export const createFtdDiscordProfile = async ({
  user,
  profile,
}: {
  user: FantordUser;
  profile: DiscordProfileResponse;
}) => {
  try {
    await prismaClient.discordProfile.create({
      data: {
        discordId: profile.id,
        discriminator: profile.discriminator,
        flags: profile.flags,
        public_flags: profile.public_flags,
        username: profile.username,
        avatar: profile.avatar,
        verified: profile.verified,
        locale: profile.locale,
        mfa_enabled: profile.mfa_enabled,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUserDiscordAccount = async ({
  account,
  profile,
}: {
  account: Account;
  profile: FantordUser;
}) => {
  try {
    await prismaClient.account.update({
      where: {
        provider_providerAccountId: {
          provider: "discord",
          providerAccountId: profile?.id || (account.providerAccountId as any),
        },
      },
      data: {
        ...account,
      },
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const generateGuildPayload = (
  guilds: Omit<DiscordUserGuilds, "features">[],
  user: FantordUser
): Prisma.UserGuildsCreateManyInput[] => {
  const res = [];
  guilds.forEach((guild) => {
    res.push({
      discordGuildId: guild.id,
      name: guild.name,
      icon: guild.icon,
      isOwner: guild.owner,
      permissions: guild.permissions,
      user: {
        connect: {
          id: user.id,
        },
      },
    });
  });
  return res;
};

export const addUserGuilds = async ({
  user,
  guilds,
}: {
  user: FantordUser;
  guilds: DiscordUserGuilds[];
}) => {
  try {
    await prismaClient.userGuilds.createMany({
      data: [...generateGuildPayload(guilds, user)],
    });
  } catch (err) {
    return Promise.reject(err);
  }
};
