import { router } from "@/server/trpc";
import { z } from "zod";
import { publicProcedure } from "@/server/trpc";

interface PrismaClientWithComment {
  comment: {
    findMany: (args: any) => Promise<any[]>;
  };
  [key: string]: any;
}

export const commentRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          // Ejemplo de input con Zod
          limit: z.number().min(1).max(100).nullish(),
          cursor: z.string().cuid().nullish(), // cursor-based pagination
        })
        .optional()
    )
    .query(async ({ ctx, input }: { ctx: { prisma: any }; input: any }) => {
      const limit = input?.limit ?? 10;
      const { cursor } = input ?? {};
      // Use type assertion to tell TypeScript that prisma has a comment property
      const prismaWithComment = ctx.prisma as PrismaClientWithComment;
      const comments = await prismaWithComment.comment.findMany({
        take: limit + 1, // Obtener uno extra para saber si hay más
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: { author: true }, // Incluir datos del autor
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (comments.length > limit) {
        const nextItem = comments.pop(); // Quitar el extra
        nextCursor = nextItem!.id;
      }

      return {
        comments,
        nextCursor,
      };
    }),
  create: publicProcedure
    .input(
      z
        .object({
          content: z.string(),
          authorId: z.string().cuid(),
          postId: z.string().cuid(),
        })
        .required()
    )
    .mutation(async ({ ctx, input }) => {
      const { content, authorId, postId } = input;
      const comment = await ctx.prisma.comment.create({
        data: {
          content,
          author: { connect: { id: authorId } },
          post: { connect: { id: postId } },
        },
      });
      return comment;
    }),
});
