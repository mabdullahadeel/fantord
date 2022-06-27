import type { Account } from "next-auth";
import { FantordUser, DiscordProfileResponse } from "../types/auth.types";
import { prismaClient } from "./prisma-client";

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