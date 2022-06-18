import "dotenv/config";
import axios, { AxiosInstance } from "axios";
import { SupportedDiscordAPIVersions } from "./types/base-client.types";

export class BaseFantordDiscordClient {
  discordAPIVersion: SupportedDiscordAPIVersions;
  axiosInstance: AxiosInstance | null;
  readonly discordApiBaseUri = "https://discord.com/api/v";

  constructor(discordAPIVersion: SupportedDiscordAPIVersions = "10") {
    this.discordAPIVersion = discordAPIVersion;
    this.axiosInstance = this.configureAxios();
  }

  private configureAxios() {
    const axiosInstance = axios.create({
      baseURL: this.discordApiBaseUri + this.discordAPIVersion,
    });

    return axiosInstance;
  }
}
