import { createRouter } from "../createRouter";

export const userRouter = createRouter().query("get-user-guilds", {
  resolve: async ({ ctx }) => {
    const userGuilds = await ctx.prisma.userGuilds.findMany({
      where: {
        user: {
          id: ctx.req.user?.sub,
        },
        isOwner: true,
      },
    });

    return userGuilds;
  },
});
