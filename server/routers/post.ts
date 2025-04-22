// src/server/routers/post.ts
import { z } from "zod";
import { router } from "@/server/trpc";
import { publicProcedure, protectedProcedure } from "@/server/trpc";

export const postRouter = router({
  // Procedimiento público para listar posts
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
      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          authorId: ctx.user.id, // Asume que user.id está en el contexto
          published: true, // O como lo manejes
        },
      });
      return post;
    }),

  //... otros procedimientos (getById, update, delete, addComment, vote, etc.)
});
