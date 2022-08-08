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
    const removeRoles = prisma.roles.deleteMany({
      where: {
        guildId: guild.id,
      },
    });
    const guildUpdate = prisma.guilds.updateMany({
      where: {
        id: guild.id,
        ownerDiscordId: guild.ownerId,
      },
      data: {
        hasFantordBot: false,
      },
    });

    const deleteAdm = prisma.guildAdministration.deleteMany({
      where: {
        guildId: guild.id,
      },
    });

    await prisma.$transaction([deleteAdm, removeRoles, guildUpdate]);
  } catch (error) {
    logger.error(error);
  }
};
