import { Client, WebhookClient } from 'discord.js';

export interface ExtendedBotClient extends Client {
  config: {
    token: string;
    debugHook: WebhookClient | undefined;
    homeGuild: string;
  };
}
