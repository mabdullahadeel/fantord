import { NextApiRequest, NextApiResponse } from "next";
import { JWT } from "next-auth/jwt";
import { prisma } from "src/server/prisma";

export function createContext({
  req,
  res,
}: {
  req: NextApiRequest & { user: JWT | null };
  res: NextApiResponse;
}) {
  return {
    req,
    res,
    prisma,
  };
}

export type Context = ReturnType<typeof createContext>;
