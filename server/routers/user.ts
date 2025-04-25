import { z } from "zod";
import { router } from "../trpc";
import { publicProcedure } from "../trpc";

export const userRouter = router({
  byId: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const user = await ctx.prisma.user.findUnique({
        where: { id },
      });
      return user;
    }),
  update: publicProcedure
    .input(z.object({ name: z.string().min(3).max(12), id: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { name } = input;
      const user = await ctx.prisma.user.update({
        where: { id: input.id },
        data: { name },
      });
      return user;
    }),
});
