import NextAuth, { Awaitable } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db, DiscordProfileResponse, FantordUser } from "@fantord/prisma";
import { UserClient } from "@fantord/datalink";
import { prisma } from "src/server/prisma";
import { FANTORD_COOKIE_NAME } from "src/server/config";

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
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    sessionToken: {
      name: FANTORD_COOKIE_NAME,
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
          await db.createFtdDiscordProfile({
            user: ftdUser,
            profile: discordProfille,
          });
        } catch (error) {
          throw error;
        }
      }
      return token;
    },
  },
  events: {
    signIn: async ({ account, profile, isNewUser, user }) => {
      if (!isNewUser) {
        try {
          await db.updateUserDiscordAccount({
            account,
            profile: profile as FantordUser,
          });
        } catch (error) {
          console.log("Could not update the account ", error);
        }
      }
      try {
        const userGuilds = await new UserClient().getUserGuilds(
          account.access_token!
        );
        if (userGuilds && userGuilds.length > 0) {
          if (isNewUser) {
            await db.addUserGuilds({
              user: user as FantordUser,
              guilds: userGuilds,
            });
          } else {
            await db.patchUserGuilds({
              user: user as FantordUser,
              guilds: userGuilds,
            });
          }
        }
      } catch (error) {
        console.log("Error while adding/updating user guilds", error);
      }
    },
  },
});
