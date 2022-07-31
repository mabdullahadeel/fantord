import type { Guild } from 'discord.js';
import { logger } from '../../../utils/logger';
import { prisma } from '../../../prisma';

/**
 * This handler is called when the bot joins a new guild
 * @param guild
 */
export const guildCreateHandler = async (guild: Guild) => {
  try {
    await prisma.guilds.updateMany({
      where: {
        discordGuildId: guild.id,
        ownerDiscordId: guild.ownerId,
      },
      data: {
        hasFantordBot: true,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};
