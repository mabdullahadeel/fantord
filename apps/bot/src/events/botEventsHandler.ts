import { ExtendedBotClient } from 'types/bot.types';
import { logger } from 'utils/logger';
import { guildEventsHandler } from './guild/guildEventsHandler';

export const botEventsHandler = (bot: ExtendedBotClient) => {
  bot.on('ready', () => {
    logger.info('Bot is ready to go!');

    guildEventsHandler(bot);
  });
};
