import { FormUpdatePost } from "@/components/posts/update/FormUpdatePost";
import { appRouter } from "@/server/routers/_app";
import { createCallerFactory, createTRPCContext } from "@/server/trpc";
import { PostType } from "@/types/PostType";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export default async function AdminPostEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  let post: PostType | null = null;
  try {
    const context = await createTRPCContext({ headers: await headers() });
    const createCaller = createCallerFactory(appRouter);
    const caller = createCaller(context);
    post = await caller.post.byId(id);
  } catch (error) {
    console.error(`Failed to fetch post with id ${id}:`, error);
  }
  if (!post) {
    notFound();
  }

  return (
    <main className="py-4">
      {/* Encabezado editorial */}
      <header className="border-b border-black/20 pb-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold uppercase tracking-tight">
            {post?.id ? "Editar Crónica" : "Nueva Crónica"}
          </h1>
          <span className="bg-black text-white px-3 py-1 text-sm uppercase">
            {post?.status}
          </span>
        </div>
        <div className="flex gap-4 text-sm text-gray-600">
          <p>Autor: {post?.author?.name || "Tú"}</p>
          <span>•</span>
          <p>
            Última actualización:{" "}
            {new Date(post?.updatedAt || Date.now()).toLocaleDateString(
              "es-ES"
            )}
          </p>
        </div>
      </header>

      <FormUpdatePost id={id} />
    </main>
  );
}
