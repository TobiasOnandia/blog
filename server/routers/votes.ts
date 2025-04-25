import { z } from "zod";
import { router } from "@/server/trpc";
import { publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const votesRouter = router({
  byPost: publicProcedure
    .input(z.string().cuid())
    .query(async ({ ctx, input }) => {
      const votes = await ctx.prisma.vote.findMany({
        where: {
          postId: input,
          authorId: ctx.user?.id,
        },
      });
      return votes;
    }),

  like: publicProcedure
    .input(z.object({ postId: z.string().cuid(), authorId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create a post",
        });
      }

      const existingVote = await ctx.prisma.vote.findFirst({
        where: {
          postId: input.postId,
          authorId: input.authorId,
        },
      });
      if (existingVote) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have already liked this post",
        });
      }
      const userId = ctx.user.id;

      const vote = await ctx.prisma.vote.create({
        data: {
          postId: input.postId,
          authorId: userId,
        },
      });
      return vote;
    }),

  dislike: publicProcedure
    .input(z.object({ postId: z.string().cuid(), authorId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You must be logged in to create a post",
        });
      }

      const existingVote = await ctx.prisma.vote.findFirst({
        where: {
          postId: input.postId,
          authorId: input.authorId,
        },
      });
      if (!existingVote) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "You have not liked this post",
        });
      }
      const userId = ctx.user.id;

      const vote = await ctx.prisma.vote.delete({
        where: {
          id: existingVote.id,
        },
      });
      return vote;
    }),
});
