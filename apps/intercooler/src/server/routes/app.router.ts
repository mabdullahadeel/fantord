import { createProtetedRouter } from "../createRouter";
import { userPublicProfileRouter } from "./public-profile.router";
import { userRouter } from "./user.router";

export const appRouter = createProtetedRouter()
  .merge("users.", userRouter)
  .merge("public-user.", userPublicProfileRouter);

export type AppRouter = typeof appRouter;
