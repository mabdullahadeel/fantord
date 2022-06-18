import { User } from "@prisma/client";
import type { DiscordProfile } from "next-auth/providers/discord";

export interface FantordUser extends User {}

export interface DiscordProfileResponse extends DiscordProfile {}
