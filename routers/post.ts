// src/server/routers/post.ts
import { z } from "zod";
import { router } from "@/server/trpc";
import { publicProcedure, protectedProcedure } from "@/server/trpc";

export const postRouter = router({
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).nullish(),
          cursor: z.string().cuid().nullish(), // cursor-based pagination
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      const limit = input?.limit ?? 10;
      const { cursor } = input ?? {};
      const posts = await ctx.prisma.post.findMany({
        take: limit + 1, // Obtener uno extra para saber si hay más
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" },
        include: { author: true }, // Incluir datos del autor
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (posts.length > limit) {
        const nextItem = posts.pop(); // Quitar el extra
        nextCursor = nextItem!.id;
      }

      return {
        posts,
        nextCursor,
      };
    }),

  // Procedimiento protegido para crear un post
  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1, "El título es requerido"),
        content: z
          .string()
          .min(5, "El contenido debe tener al menos 5 caracteres"),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const postData: any = {
        title: input.title,
        content: input.content,
        published: true, // O como lo manejes
      };
      if (ctx.user.data.user?.id !== undefined) {
        postData.authorId = ctx.user.data.user.id;
      }
      const post = await ctx.prisma.post.create({
        data: postData,
      });
      return post;
    }),
});
