import { Guild } from 'discord.js';
import { logger } from 'utils/logger';
import { prisma } from 'prisma';

/**
 * This handler is called when the bot joins a new guild
 * @param guild
 */
export const guildCreateHandler = async (guild: Guild) => {
  console.log(`Joined guild: ${guild.name}`);
  console.log(guild);
  try {
    await prisma.userGuilds.updateMany({
      where: {
        discordGuildId: guild.id,
        user: {
          accounts: {
            providerAccountId: guild.ownerId,
          },
        },
      },
      data: {
        hasFantordBot: true,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};
