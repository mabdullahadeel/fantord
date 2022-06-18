import type { User as NextAuthDefaultUser } from "next-auth";
import type { DiscordProfile } from "next-auth/providers/discord";

export interface FantordUser extends NextAuthDefaultUser {
  fantordUsername: string;
}

export interface DiscordProfileResponse extends DiscordProfile {}
