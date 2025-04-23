// src/server/routers/_app.ts
import { router } from "../trpc";
import { postRouter } from "./post";
// Importa otros routers si los tienes (ej: commentRouter, userRouter)

export const appRouter = router({
  post: postRouter,
  // comment: commentRouter,
  // user: userRouter,
  //... otros routers
});

// Exportar el tipo del AppRouter es crucial para la seguridad de tipos en el cliente
export type AppRouter = typeof appRouter;
