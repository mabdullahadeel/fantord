import type { GuildMember } from 'discord.js';
import { logger } from '../../../utils/logger';
import { prisma } from '../../../prisma';

/**
 * This handler is called when new
 * member joins the server
 * @param guild
 */
export const memberAddHandler = async (member: GuildMember) => {
  try {
    const guildAdmn = await prisma.guildAdministration.findFirst({
      where: {
        guildId: member.guild.id,
      },
      include: {
        joinRoles: true,
      },
    });
    const roledAddPromises = [];
    guildAdmn.joinRoles.map((role) => {
      roledAddPromises.push(member.roles.add(role.id));
    });

    await Promise.all(roledAddPromises);
  } catch (error) {
    logger.error(error);
  }
};
