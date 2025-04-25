import { router } from "../trpc";
import { commentRouter } from "./comment";
import { postRouter } from "./post";
import { votesRouter } from "./votes";
import { userRouter } from "./user";

export const appRouter = router({
  post: postRouter,
  comment: commentRouter,
  votes: votesRouter,
  user: userRouter,
});

export type AppRouter = typeof appRouter;
