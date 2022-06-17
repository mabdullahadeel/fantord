import NextAuth, { Awaitable } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@fantord/prisma";
import {
  DiscordProfileResponse,
  FantordUser,
} from "src/server/types/user-types";
import {
  generateFantordUsername,
  generateProfileUrl,
} from "src/server/utils/auth";
const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify guilds email",
        },
      },
      profile(profile: DiscordProfileResponse): Awaitable<FantordUser> {
        return {
          id: profile.id,
          name: profile.username,
          email: profile.email,
          fantordUsername: generateFantordUsername(profile),
          image: generateProfileUrl(profile),
          emailVerified: null,
        };
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: "__ftd-session",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: true,
      },
    },
  },
  callbacks: {
    async session({ token, session }) {
      if (!session.userId) {
        return {
          ...session,
          user: {
            ...session.user,
            userId: token.sub,
          },
        };
      }
      return session;
    },
    async jwt({ user, profile, token, isNewUser, account }) {
      const ftdUser = user as FantordUser;
      const discordProfille = profile as DiscordProfileResponse;
      if (isNewUser && account?.provider === "discord") {
        try {
          await prisma.discordProfile.create({
            data: {
              discordId: discordProfille.id,
              discriminator: discordProfille.discriminator,
              flags: discordProfille.flags,
              public_flags: discordProfille.public_flags,
              username: discordProfille.username,
              avatar: discordProfille.avatar,
              verified: discordProfille.verified,
              locale: discordProfille.locale,
              mfa_enabled: discordProfille.mfa_enabled,
              user: {
                connect: {
                  id: ftdUser.id,
                },
              },
            },
          });
        } catch (error) {
          throw error;
        }
      }
      return token;
    },
  },
  events: {
    signIn: async ({ account, profile, isNewUser }) => {
      if (isNewUser) return;
      try {
        await prisma.account.update({
          where: {
            provider_providerAccountId: {
              provider: "discord",
              providerAccountId:
                profile?.id || (account.providerAccountId as any),
            },
          },
          data: {
            ...account,
          },
        });
        console.log("account update successfully");
      } catch (error) {
        console.log("Could not update the account");
      }
    },
  },
});
