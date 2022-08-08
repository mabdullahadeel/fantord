import { WebhookClient } from 'discord.js';
import { ExtendedBotClient } from 'src/types/bot.types';
import { logger } from './logger';

export const validateEnv = (bot: ExtendedBotClient) => {
  if (!process.env.DISCORD_TOKEN) {
    logger.error('Missing DISCORD_TOKEN environment variable');
    process.exit(1);
  }
  if (!process.env.FANTORD_BOT_DATABAE_URL) {
    logger.error('Missing FANTORD_BOT_DATABAE_URL environment variable');
    process.exit(1);
  }
  // if (!process.env.HOME_GUILD) {
  //   logger.error('Missing FANTORD_BOT_HOME_GUILD environment variable');
  //   process.exit(1);
  // }

  bot.config = {
    token: process.env.DISCORD_TOKEN,
    debugHook: process.env.DEBUG_HOOK
      ? new WebhookClient({ url: process.env.DEBUG_HOOK })
      : undefined,
    homeGuild: process.env.HOME_GUILD || '',
  };
};
