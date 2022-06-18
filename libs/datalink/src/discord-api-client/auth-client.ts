import "dotenv/config";
import axios, { AxiosInstance } from "axios";
import { DiscordTokenResponse } from "./types/auth-client.types";
export class DiscordAuthClient {
  private discordClientId: string;
  private discordClientSecret: string;
  axiosInstance: AxiosInstance | null;
  readonly discordAuthBaseUri = "https://discord.com/api/oauth2";

  constructor() {
    this.discordClientId = process.env.DISCORD_CLIENT_ID!;
    this.discordClientSecret = process.env.DISCORD_CLIENT_SECRET!;
    if (!this.discordClientId || !this.discordClientSecret) {
      throw new Error("Missing environment variables for Discord API");
    }
    this.axiosInstance = this.configureAxios();
  }

  private configureAxios(): AxiosInstance {
    const axiosInstance = axios.create({
      baseURL: this.discordAuthBaseUri,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return axiosInstance;
  }

  async refreshToken(refreshToken: string): Promise<DiscordTokenResponse> {
    return this.axiosInstance.post(this.discordAuthBaseUri + "/token", {
      client_id: this.discordClientId,
      client_secret: this.discordClientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });
  }
}

export const authClient = new DiscordAuthClient();
