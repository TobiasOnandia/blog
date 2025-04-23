import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@/server/routers/_app";
import { createTRPCContext } from "@/server/trpc";
import { headers } from "next/headers";

export const createServerCaller = async () => {
  const context = await createTRPCContext({ headers: await headers() });
  return appRouter.createCaller(context);
};
