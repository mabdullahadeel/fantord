import { fantordIntents } from './config/IntentOptions';
import { Client, Partials } from 'discord.js';
import { config } from 'dotenv';
import { ExtendedBotClient } from './types/bot.types';
import { logger } from './utils/logger';
import { prisma } from './prisma';
import { validateEnv } from './utils/validateEnv';
import { botEventsHandler } from './events/botEventsHandler';

config();

(async () => {
  logger.info('Starting bot...');
  const bot = new Client({
    intents: fantordIntents,
    partials: [Partials.Channel, Partials.Message, Partials.Reaction],
  }) as ExtendedBotClient;

  validateEnv(bot);
  await prisma.$connect();

  botEventsHandler(bot);

  await bot
    .login(process.env.DISCORD_TOKEN)
    .then(() => {
      logger.info('Logged in');
    })
    .catch((err) => logger.error(err));

  // register commands here
})();
