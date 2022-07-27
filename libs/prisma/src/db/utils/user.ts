import { DiscordUserGuilds } from "@fantord/datalink";
import type { Prisma } from "@prisma/client";
import { FantordUser } from "types";

export const generateGuildPayload = (
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
      userId: user.id,
    });
  });
  return res;
};
