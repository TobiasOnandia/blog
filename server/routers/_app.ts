import { router } from "../trpc";
import { commentRouter } from "./comment";
import { postRouter } from "./post";
import { votesRouter } from "./votes";

export const appRouter = router({
  post: postRouter,
  comment: commentRouter,
  votes: votesRouter,
});

export type AppRouter = typeof appRouter;
