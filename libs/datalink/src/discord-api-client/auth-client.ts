import "dotenv/config";
import axios, { AxiosInstance } from "axios";
import { SupportedDiscordAPIVersions } from "./types/base-client.types";

class BaseFantordDiscordClient {
  private discordClientId: string;
  private discordClientSecret: string;
  discordAPIVersion: SupportedDiscordAPIVersions;
  axiosInstance: AxiosInstance | null;

  constructor(discordAPIVersion: SupportedDiscordAPIVersions = "10") {
    this.discordClientId = process.env.DISCORD_CLIENT_ID!;
    this.discordClientSecret = process.env.DISCORD_CLIENT_SECRET!;
    if (!this.discordClientId || !this.discordClientSecret) {
      throw new Error("Missing environment variables for Discord API");
    }
    this.discordAPIVersion = discordAPIVersion;
    this.axiosInstance = this.configureAxios();
  }

  private configureAxios(): AxiosInstance {
    const discordAPIBaseUri =
      "https://discord.com/api/v" + this.discordAPIVersion;
    const axiosInstance = axios.create({
      baseURL: discordAPIBaseUri,
      auth: {
        username: this.discordClientId,
        password: this.discordClientSecret,
      },
    });

    return axiosInstance;
  }
}
