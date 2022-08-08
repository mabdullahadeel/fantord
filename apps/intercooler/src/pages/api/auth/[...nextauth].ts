import NextAuth from "next-auth";
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
      try {
        if (
          account?.provider === "discord" &&
          account.access_token &&
          profile?.id &&
          user?.id
        ) {
          // creating default public profile
          await prisma.fantordProfilePreferences.upsert({
            where: {
              userId: user.id,
            },
            update: {},
            create: {
              user: {
                connect: {
                  id: user.id,
                },
              },
            },
          });
          const userGuilds = await new UserClient().getUserGuilds(
            account.access_token
          );
          if (userGuilds && userGuilds.length > 0) {
            if (isNewUser) {
              await db.addUserGuilds({
                user: user as FantordUser,
                guilds: userGuilds,
                account,
              });
            } else {
              await db.patchUserGuilds({
                user: user as FantordUser,
                guilds: userGuilds,
                account,
              });
            }
          }
          await db.createOrUpdateFtdDiscordProfile({
            user: user as FantordUser,
            profile: profile as DiscordProfileResponse,
          });
          await db.updateUserDiscordAccount({ account });
        }
      } catch (error) {
        console.log("error", error);
        return new Promise((_, reject) => reject(false));
      }
      return token;
    },
  },
});
