import { IntentsBitField } from 'discord.js';

export const fantordIntents = new IntentsBitField([
  IntentsBitField.Flags.Guilds,
  IntentsBitField.Flags.GuildMessages,
  // IntentsBitField.Flags.GuildMembers,
  // IntentsBitField.Flags.GuildMessageReactions,
  // IntentsBitField.Flags.DirectMessages,
  // IntentsBitField.Flags.DirectMessageReactions,
]);
