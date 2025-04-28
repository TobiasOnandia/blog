import { FormUpdatePost } from "@/components/posts/update/FormUpdatePost";
import { postById } from "@/server/posts/postById";

export default async function AdminPostEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await postById({ id });
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
