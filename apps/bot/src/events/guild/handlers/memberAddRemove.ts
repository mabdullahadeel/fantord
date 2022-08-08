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
    if (member.user.bot) return;
    const guildAdmn = await prisma.guildAdministration.findFirst({
      where: {
        guildId: member.guild.id,
      },
      include: {
        joinRoles: {
          select: {
            id: true,
          },
        },
      },
    });

    const idArr = guildAdmn.joinRoles.map((role) => role.id);
    if (idArr.length > 0) {
      const roles = await member.guild.roles.fetch();
      const rolesToAdd = roles.filter((role) => idArr.includes(role.id));
      await member.roles.add(rolesToAdd);
    }
  } catch (error) {
    logger.error(error);
  }
};
