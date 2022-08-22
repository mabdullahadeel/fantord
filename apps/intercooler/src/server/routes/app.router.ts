import { createProtectedRouter } from "../createRouter";
import { guildAdministration } from "./guild-administration.router";
import { userPublicProfileRouter } from "./public-profile.router";
import { userRouter } from "./user.router";

export const appRouter = createProtectedRouter()
  .merge("users.", userRouter)
  .merge("public-user.", userPublicProfileRouter);
// .merge("guild-administration.", guildAdministration);

export type AppRouter = typeof appRouter;
