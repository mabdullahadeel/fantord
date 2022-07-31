import type { Guild } from 'discord.js';
import { logger } from '../../../utils/logger';
import { prisma } from '../../../prisma';

/**
 * This handler is called when the bot is kicked out
 * of the server
 * @param guild
 */
export const guildDeleteHandler = async (guild: Guild) => {
  try {
    await prisma.userGuilds.updateMany({
      where: {
        discordGuildId: guild.id,
        isOwner: true,
        user: {
          accounts: {
            providerAccountId: guild.ownerId,
          },
        },
      },
      data: {
        hasFantordBot: false,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};
