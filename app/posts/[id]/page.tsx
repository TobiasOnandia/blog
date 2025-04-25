import { createCallerFactory, createTRPCContext } from "@/server/trpc"; // Importa helpers de tRPC
import { AppRouter, appRouter } from "@/server/routers/_app"; // Importa tu router principal
import { headers } from "next/headers"; // Para obtener headers en RSC
import { notFound } from "next/navigation"; // Para manejar post no encontrado
import { type inferRouterOutputs } from "@trpc/server"; // Para inferir tipos
import { PostDisplay } from "@/components/posts/view/ById/PostDisplay";

type RouterOutput = inferRouterOutputs<AppRouter>;
type PostType = RouterOutput["post"]["byId"];

export default async function PostDetail({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

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

  return <PostDisplay post={postData} id={id} />;
}
