import { PostType } from "@/types/PostType";
import { notFound } from "next/navigation";
import { createCallerFactory, createTRPCContext } from "@/server/trpc";
import { headers } from "next/headers";
import { appRouter } from "@/server/routers/_app";

export const postById = async ({ id }: { id: string }) => {
  let postData: PostType | null = null;
  try {
    const context = await createTRPCContext({ headers: await headers() });
    const createCaller = createCallerFactory(appRouter);
    const caller = createCaller(context);
    postData = await caller.post.byId(id);
  } catch (error) {
    console.error(`Failed to fetch post with id ${id}:`, error);
  }
  if (!postData) {
    notFound();
  }

  return postData;
};
