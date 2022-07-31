import type { Role } from 'discord.js';
import { logger } from '../../../utils/logger';
import { prisma } from '../../../prisma';

/**
 * This handler is responsible for handling guild new
 * role create event
 * @param role
 */
export const roleCreated = async (role: Role) => {
  try {
    await prisma.roles.create({
      data: {
        id: role.id,
        name: role.name,
        colorHex: role.hexColor,
        guildId: role.guild.id,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

/**
 * This handler is responsible for handling
 * role delete event from discord
 * @param role
 */
export const roleDeleted = async (role: Role) => {
  try {
    await prisma.roles.delete({
      where: {
        id: role.id,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};

/**
 * This handler is responsible for handling
 * role update event from discord
 * @param oldRole
 * @param newRole
 */
export const roleUpdated = async (oldRole: Role, newRole: Role) => {
  try {
    await prisma.roles.update({
      where: {
        id: oldRole.id,
      },
      data: {
        name: newRole.name,
        colorHex: newRole.hexColor,
      },
    });
  } catch (error) {
    logger.error(error);
  }
};
