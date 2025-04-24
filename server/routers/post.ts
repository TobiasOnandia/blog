import { z } from "zod";
import { router } from "@/server/trpc";
import { publicProcedure, protectedProcedure } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
// Function to generate a slug from a title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Replace multiple hyphens with a single hyphen
}
export const postRouter = router({
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
      // Verify user is authenticated and has an ID
      if (!ctx.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create a post",
        });
      }

      const userId = ctx.user.id;

      // Generate base slug from title
      let baseSlug = generateSlug(input.title);

      // Ensure uniqueness by appending timestamp if needed
      const timestamp = Date.now().toString().slice(-6);
      const slug = `${baseSlug}-${timestamp}`;

      const post = await ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
          authorId: userId,
          published: true,
          slug: slug, // Add the generated slug
        },
      });
      return post;
    }),
});
