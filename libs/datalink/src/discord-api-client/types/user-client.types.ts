export type DiscordGuilFeatures =
  | "ANIMATED_BANNER"
  | "ANIMATED_ICON"
  | "AUTO_MODERATION"
  | "BANNER"
  | "COMMERCE"
  | "COMMUNITY"
  | "DISCOVERABLE"
  | "FEATURABLE"
  | "INVITE_SPLASH"
  | "MEMBER_VERIFICATION_GATE_ENABLED"
  | "MEMBER_PROFILES"
  | "ROLE_ICONS"
  | "PREVIEW_ENABLED"
  | "WELCOME_SCREEN_ENABLED"
  | "THREE_DAY_THREAD_ARCHIVE"
  | "SEVEN_DAY_THREAD_ARCHIVE"
  | "NEWS"
  | "VIP_REGIONS"
  | "PARTNERED"
  | "VANITY_URL"
  | "PRIVATE_THREADS"
  | "THREADS_ENABLED"
  | "ENABLED_DISCOVERABLE_BEFORE";

export interface DiscordUserGuilds {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: number;
  features: DiscordGuilFeatures[];
}
