import { router } from "../trpc";
import { postRouter } from "./post";
// Importa otros routers si los tienes (ej: commentRouter, userRouter)

export const appRouter = router({
  post: postRouter,
  // comment: commentRouter,
  // user: userRouter,
  //... otros routers
});

export type AppRouter = typeof appRouter;
