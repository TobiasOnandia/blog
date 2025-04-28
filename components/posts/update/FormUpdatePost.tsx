"use client";
import { Status } from "@/prisma/app/generated/prisma/client";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";

export const FormUpdatePost = ({ id }: { id: string }) => {
  const utils = trpc.useUtils();
  const { data: post } = trpc.post.byId.useQuery(id);
  const router = useRouter();

  const updatePost = trpc.post.update.useMutation({
    onSuccess: () => {
      utils.post.list.invalidate();
      toast.success("Crónica actualizada exitosamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deletePost = trpc.post.delete.useMutation({
    onSuccess: () => {
      utils.post.list.invalidate();
      toast.success("Crónica eliminada exitosamente");
      router.push("/profile");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [_, formAction, isLoading] = useActionState(
    (_: void | null, formData: FormData) => {
      const { title, content, category, status } = Object.fromEntries(
        formData.entries()
      );

      updatePost.mutate({
        id,
        title: title as string,
        content: content as string,
        category: category as string,
        status: status as Status,
      });

      router.refresh();
    },
    null
  );

  return (
    <form
      action={formAction}
      className="space-y-8 grid w-full xl:grid-cols-3 gap-8"
    >
      <fieldset className="xl:col-span-1 space-y-6">
        <label
          htmlFor="category"
          className="block text-sm uppercase tracking-widest mb-6"
        >
          Categoría
          <select
            name="category"
            id="category"
            defaultValue={post?.category.toLowerCase()}
            className="w-full border border-black/20 p-3 mt-3 bg-transparent"
          >
            <option value="politica">Política</option>
            <option value="cultura">Cultura</option>
            <option value="economia">Economía</option>
          </select>
        </label>

        <fieldset className="block text-sm uppercase tracking-widest mb-6">
          Estado
          <div className="flex border mt-3 border-black/20 overflow-hidden rounded">
            <input
              type="radio"
              id="statusDraft"
              name="status"
              value="BORRADOR"
              defaultChecked={post?.status === "BORRADOR"}
              className="sr-only peer/draft"
            />
            <label
              htmlFor="statusDraft"
              className={`
            flex-1 p-2 text-center cursor-pointer transition-colors duration-200
            peer-checked/draft:bg-black peer-checked/draft:text-white
            peer-not-checked/draft:hover:bg-black/5
          `}
            >
              Borrador
            </label>
            {/* Opción Publicado */}
            <input
              type="radio"
              id="statusPublished"
              name="status"
              value="PUBLICADO"
              defaultChecked={post?.status === "PUBLICADO"}
              className="sr-only peer"
            />
            <label
              htmlFor="statusPublished"
              className={`
            flex-1 p-2 text-center cursor-pointer transition-colors duration-200
            peer-checked:bg-black peer-checked:text-white
          `}
            >
              Publicado
            </label>
          </div>
        </fieldset>

        <label className="block text-sm uppercase tracking-widest mb-3">
          Imagen principal
          <figure className="border border-black/20 aspect-video bg-gray-50 flex flex-col mt-3 items-center justify-center">
            <p className="text-gray-600 text-sm text-center">Sin imagen</p>
            <input
              type="file"
              className="text-xs uppercase hover:underline"
              accept="image/*"
            />
          </figure>
        </label>
      </fieldset>

      {/* Columna derecha - Contenido */}
      <fieldset className="md:col-span-2 space-y-6">
        <label
          htmlFor="title"
          className="flex flex-col gap-4  text-sm uppercase tracking-widest mb-3"
        >
          Título
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={post?.title}
            className="w-full text-2xl font-bold border-b border-black/20 p-2 focus:border-black/60"
            placeholder="Escribe el titular aquí"
          />
        </label>

        <label
          htmlFor="content"
          className="flex flex-col gap-4  text-sm uppercase tracking-widest mb-3"
        >
          Contenido
          <textarea
            name="content"
            id="content"
            defaultValue={post?.content as string}
            className="w-full h-103 p-4 border border-black/20 resize-none"
            placeholder="Comienza a escribir tu crónica..."
          />
        </label>
      </fieldset>

      {/* Acciones */}
      <div className="flex justify-between col-span-3 gap-4 border-t border-black/20 pt-8">
        <button
          onClick={() => deletePost.mutate(id)}
          type="button"
          className="text-red-600 cursor-pointer hover:text-red-800 text-sm uppercase tracking-widest"
        >
          Eliminar artículo permanentemente
        </button>
        <button
          type="submit"
          className="px-6 py-3 cursor-pointer bg-black text-white uppercase tracking-widest text-sm hover:bg-gray-800 transition-all"
        >
          {isLoading ? "Guardando..." : "Guardar Cambios"}
        </button>
      </div>
    </form>
  );
};
