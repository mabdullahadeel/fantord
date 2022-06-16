import type { DiscordProfile as DiscordProfileResponse } from "next-auth/providers/discord";

export const generateProfileUrl = (profile: DiscordProfileResponse) => {
  if (profile.avatar === null) {
    const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
    const defaultProfileUrl = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
    return defaultProfileUrl;
  }
  const format = profile.avatar.startsWith("a_") ? "gif" : "png";
  const profileUrl = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
  return profileUrl;
};

export const generateFantordUsername = (profile: DiscordProfileResponse) => {
  const username = `${profile.username}#${profile.discriminator}`;
  return username;
};
