import { router } from "@/server/trpc";
import { z } from "zod";
import { publicProcedure } from "@/server/trpc";

export const commentRouter = router({
  create: publicProcedure
    .input(
      z.object({
        content: z.string(),
        authorId: z.string().uuid(),
        postId: z.string().cuid(),
        parentCommentId: z.string().cuid().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { content, authorId, postId, parentCommentId } = input;
      const comment = await ctx.prisma.comment.create({
        data: {
          content,
          author: { connect: { id: authorId } },
          post: { connect: { id: postId } },
          parentCommentId: parentCommentId,
        },
      });
      return comment;
    }),

  byPost: publicProcedure
    .input(z.string().cuid())
    .query(async ({ ctx, input }) => {
      const comments = await ctx.prisma.comment.findMany({
        where: { postId: input },
        include: { author: true },
        orderBy: { createdAt: "desc" },
      });
      return comments;
    }),
});
