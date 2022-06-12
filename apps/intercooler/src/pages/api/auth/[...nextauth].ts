import NextAuth, {
  Awaitable,
  Session,
  User as NextAuthDefaultUser,
} from "next-auth";
import DiscordProvider, {
  DiscordProfile as DiscordProfileResponse,
} from "next-auth/providers/discord";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@fantord/prisma";

const prisma = new PrismaClient();

interface FantordUser extends NextAuthDefaultUser {
  fantordUsername: string;
}

interface FtdSession extends Session {
  userId: string;
}

const generateProfileUrl = (profile: DiscordProfileResponse) => {
  if (profile.avatar === null) {
    const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
    const defaultProfileUrl = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
    return defaultProfileUrl;
  }
  const format = profile.avatar.startsWith("a_") ? "gif" : "png";
  const profileUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
  return profileUrl;
};

const generateFantordUsername = (profile: DiscordProfileResponse) => {
  const username = `${profile.username}#${profile.discriminator}`;
  return username;
};

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
    async jwt({ user, profile, token, isNewUser }) {
      const ftdUser = user as FantordUser;
      const discordProfille = profile as DiscordProfileResponse;
      if (isNewUser) {
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
});
