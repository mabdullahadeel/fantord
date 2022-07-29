import { ExtendedBotClient } from 'types/bot.types';
import { guildCreateHandler } from './handlers';

export const guildEventsHandler = (bot: ExtendedBotClient) => {
  bot.on('guildCreate', (guild) => guildCreateHandler(guild));
};
