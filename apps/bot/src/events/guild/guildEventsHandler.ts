import { ExtendedBotClient } from 'src/types/bot.types';
import { guildCreateHandler, guildDeleteHandler } from './handlers';
import {
  roleCreated,
  roleDeleted,
  roleUpdated,
} from './handlers/guildRolesHandlers';

export const guildEventsHandler = (bot: ExtendedBotClient) => {
  bot.on('guildCreate', (guild) => guildCreateHandler(guild));
  bot.on('guildDelete', (guild) => guildDeleteHandler(guild));
  bot.on('roleCreate', (role) => roleCreated(role));
  bot.on('roleDelete', (role) => roleDeleted(role));
  bot.on('roleUpdate', (oldRole, newRole) => {
    roleUpdated(oldRole, newRole);
  });
};
