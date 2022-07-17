import type { Account } from "next-auth";
import { FantordUser, DiscordProfileResponse } from "../types/auth.types";
import { prisma as prismaClient } from "./prisma-client";

export const createOrUpdateFtdDiscordProfile = async ({
  user,
  profile,
}: {
  user: FantordUser;
  profile: DiscordProfileResponse;
}) => {
  try {
    await prismaClient.discordProfile.upsert({
      where: {
        userId: user.id,
      },
      update: {},
      create: {
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
}: {
  account: Account;
}) => {
  try {
    await prismaClient.account.update({
      where: {
        provider_providerAccountId: {
          provider: "discord",
          providerAccountId: account.providerAccountId,
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
