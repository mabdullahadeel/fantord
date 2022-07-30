import { ExtendedBotClient } from 'src/types/bot.types';
import { guildCreateHandler, guildDeleteHandler } from './handlers';

export const guildEventsHandler = (bot: ExtendedBotClient) => {
  bot.on('guildCreate', (guild) => guildCreateHandler(guild));
  bot.on('guildDelete', (guild) => guildDeleteHandler(guild));
};
