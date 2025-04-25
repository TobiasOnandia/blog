/**
 * Pagina de edición de una crónica en el administrador.
 *
 * Permite editar una crónica existente o crear una nueva.
 *
 * @returns Componente de React que renderiza la interfaz de la página.
 */

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
    <main className="">
      {/* Encabezado editorial */}
      <header className="border-b border-black/20 pb-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold uppercase tracking-tight">
            {post?.id ? "Editar Crónica" : "Nueva Crónica"}
          </h1>
          <span className="bg-black text-white px-3 py-1 text-sm uppercase">
            {/* {post?.status || "BORRADOR"} */}
            BORRADOR
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

      {/* Formulario de edición */}
      <form className="space-y-8">
        {/* Sección principal */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Columna izquierda - Metadatos */}
          <div className="md:col-span-1 space-y-6">
            <div>
              <label className="block text-sm uppercase tracking-widest mb-3">
                Categoría
              </label>
              <select className="w-full border border-black/20 p-3 bg-transparent">
                <option value="">Seleccionar sección</option>
                <option value="politica">Política</option>
                <option value="cultura">Cultura</option>
                <option value="economia">Economía</option>
              </select>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-widest mb-3">
                Estado
              </label>
              <div className="flex border border-black/20">
                <button
                  type="button"
                  className={`flex-1 p-2 `}
                  // ${
                  // post?.status === "DRAFT"
                  // ? "bg-black text-white"
                  // : "hover:bg-black/5"
                  // }
                >
                  Borrador
                </button>
                <button
                  type="button"
                  className={`flex-1 p-2 `}
                  // ${
                  //   post?.status === "PUBLISHED"
                  //     ? "bg-black text-white"
                  //     : "hover:bg-black/5"
                  // }
                >
                  Publicado
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm uppercase tracking-widest mb-3">
                Imagen principal
              </label>
              <div className="border border-black/20 aspect-video bg-gray-50 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <p className="text-gray-600 text-sm">Sin imagen</p>
                  <button
                    type="button"
                    className="text-xs uppercase hover:underline"
                  >
                    Seleccionar archivo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha - Contenido */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <label className="block text-sm uppercase tracking-widest mb-3">
                Título
              </label>
              <input
                type="text"
                className="w-full text-2xl font-bold border-b border-black/20 pb-2 focus:border-black/60"
                placeholder="Escribe el titular aquí"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-widest mb-3">
                Contenido
              </label>
              <textarea
                className="w-full h-96 p-4 border border-black/20 resize-none"
                placeholder="Comienza a escribir tu crónica..."
              />
            </div>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex gap-4 border-t border-black/20 pt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-black text-white uppercase tracking-widest text-sm hover:bg-gray-800 transition-all"
          >
            Guardar Cambios
          </button>
          <button
            type="button"
            className="px-6 py-3 border border-black/20 uppercase tracking-widest text-sm hover:bg-black/5 transition-all"
          >
            Vista Previa
          </button>
        </div>
      </form>

      {/* Sección de peligro */}
      {post?.id && (
        <div className="mt-12 border-t border-red-200 pt-8">
          <div className="max-w-prose">
            <h3 className="text-sm uppercase tracking-widest text-red-600 mb-4">
              Zona de peligro
            </h3>
            <button
              type="button"
              className="text-red-600 hover:text-red-800 text-sm uppercase tracking-widest"
            >
              Eliminar artículo permanentemente →
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
