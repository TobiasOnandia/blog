import { createTRPCReact } from "@trpc/react-query";
import { type AppRouter } from "@/server/routers/_app";

// Crea el cliente tRPC con hooks de React Query
export const trpc = createTRPCReact<AppRouter>({});
