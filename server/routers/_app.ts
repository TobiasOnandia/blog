import { router } from "../trpc";
import { commentRouter } from "./comment";
import { postRouter } from "./post";

export const appRouter = router({
  post: postRouter,
  comment: commentRouter,
});

export type AppRouter = typeof appRouter;
