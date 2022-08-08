export const generateGuildIconUri = (guildId: string, icon: string | null) => {
  if (!icon) return;
  return `https://cdn.discordapp.com/icons/${guildId}/${icon}.png`;
};
