import { NextApiRequest } from "next";
import { getToken } from "next-auth/jwt";
import { FANTORD_COOKIE_NAME } from "../config";

const secret = process.env.NEXTAUTH_SECRET || "";

export const getUserFromRequest = async (req: NextApiRequest) => {
  try {
    const user = await getToken({
      req,
      cookieName: FANTORD_COOKIE_NAME,
      secret,
    });
    return user;
  } catch (error) {
    return null;
  }
};
