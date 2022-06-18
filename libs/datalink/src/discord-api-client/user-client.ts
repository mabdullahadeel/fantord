import { BaseFantordDiscordClient } from "./base-client";
import type { DiscordProfile } from "next-auth/providers/discord";
import { DiscordUserGuilds } from "./types/user-client.types";
import { ClientOptions } from "./types";

export class UserClient extends BaseFantordDiscordClient {
  private userBaseUri = "/users";
  private defaultTokenType = "Bearer";

  public async getUserProfile(
    token: string,
    opts?: ClientOptions
  ): Promise<DiscordProfile> {
    try {
      const { data } = await this.axiosInstance.get<DiscordProfile>(
        `${this.userBaseUri}/@me`,
        {
          headers: {
            Authorization: `${
              opts.tokenType || this.defaultTokenType
            } ${token}`,
          },
        }
      );
      opts.onSuccess ?? opts.onSuccess(data);
      return data;
    } catch (err) {
      opts.onFailuer ?? opts.onFailuer(err);
      return Promise.reject(err);
    }
  }

  public async getUserGuilds(
    token: string,
    opts?: ClientOptions
  ): Promise<DiscordUserGuilds[]> {
    try {
      const { data } = await this.axiosInstance.get<DiscordUserGuilds[]>(
        `${this.userBaseUri}/@me`,
        {
          headers: {
            Authorization: `${
              opts.tokenType || this.defaultTokenType
            } ${token}`,
          },
        }
      );
      opts.onSuccess ?? opts.onSuccess(data);
      return data;
    } catch (err) {
      opts.onFailuer ?? opts.onFailuer(err);
      return Promise.reject(err);
    }
  }
}

export const userClient = new UserClient();
