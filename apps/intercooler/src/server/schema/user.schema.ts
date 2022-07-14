import z from "zod";

export const updateFtdProfilePrefSchema = z.object({
  showPublic: z.boolean(),
  showGuilds: z.boolean(),
});

export type UpdateFtdProfilePref = z.TypeOf<typeof updateFtdProfilePrefSchema>;
