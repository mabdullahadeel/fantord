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
    await prisma.guilds.updateMany({
      where: {
        discordGuildId: guild.id,
        ownerDiscordId: guild.ownerId,
      },
      data: {
        hasFantordBot: false,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};
