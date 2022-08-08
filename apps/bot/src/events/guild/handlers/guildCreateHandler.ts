import type { Guild } from 'discord.js';
import { logger } from '../../../utils/logger';
import { prisma } from '../../../prisma';
import { Prisma } from '@fantord/prisma';

/**
 * This handler is called when the bot joins a new guild
 * @param guild
 */
export const guildCreateHandler = async (guild: Guild) => {
  try {
    const roles = await guild.roles.fetch();
    const rolesPayload: Prisma.RolesCreateManyInput[] = [];
    roles.forEach((role) => {
      if (role.managed || role.name === '@everyone') return;
      rolesPayload.push({
        id: role.id,
        name: role.name,
        colorHex: role.hexColor,
        guildId: guild.id,
      });
    });
    const rolesCreate = prisma.roles.createMany({
      data: rolesPayload,
    });

    const updateGuild = prisma.guilds.updateMany({
      where: {
        id: guild.id,
        ownerDiscordId: guild.ownerId,
      },
      data: {
        hasFantordBot: true,
      },
    });

    const createAdministration = prisma.guildAdministration.create({
      data: {
        guildId: guild.id,
      },
    });

    await prisma.$transaction([rolesCreate, createAdministration, updateGuild]);
  } catch (error) {
    logger.error(error);
  }
};
