import { createReactQueryHooks } from "@trpc/react";
import { AppRouter } from "src/server/routes/app.router";

export const trpc = createReactQueryHooks<AppRouter>();
