export type SupportedDiscordAPIVersions = "9" | "10";
export interface ClientOptions {
  onSuccess?: (data: unknown) => void | null;
  onFailuer?: (err: unknown) => void | null;
  tokenType?: string | null;
}
