import { createProtetedRouter } from "../createRouter";
import { userRouter } from "./user.router";

export const appRouter = createProtetedRouter().merge("users.", userRouter);

export type AppRouter = typeof appRouter;
