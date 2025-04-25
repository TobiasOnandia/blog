"use client";
import { trpc } from "@/utils/trpc";
import { useActionState } from "react";
import { toast } from "sonner";

export const FormPost = () => {
  const utils = trpc.useUtils();

  const createPostMutation = trpc.post.create.useMutation({
    onSuccess: () => {
      utils.post.list.invalidate();
      toast.success("Post creado exitosamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [state, formAction, isPending] = useActionState(
    async (_: void | null, formData: FormData) => {
      const { title, category, content } = window.Object.fromEntries(
        formData.entries()
      );

      if (!title || !content || !category) {
        toast.error("Por favor, completa todos los campos");
        return;
      }

      try {
        await createPostMutation.mutateAsync({
          title: title as string,
          category: category as string,
          content: content as string,
        });
      } catch (error) {
        toast.error("Error al crear el post");
      }
    },
    null
  );

  return (
    <form action={formAction} className="space-y-8 flex flex-col gap-4">
      {/* Sección básica */}
      <label
        htmlFor="title"
        className="flex flex-col gap-4 text-sm uppercase tracking-widest"
      >
        Título principal
        <input
          type="text"
          name="title"
          id="title"
          className="w-full text-3xl font-bold border-b border-black/20 p-2 focus:border-black/60"
          placeholder="Escribe tu titular aquí"
        />
      </label>

      {/* Selector de categoría */}
      <label htmlFor="category" className="  text-sm uppercase tracking-widest">
        Sección:
        <select
          name="category"
          id="category"
          className="bg-transparent ml-2 border border-black/20 px-4 py-2"
        >
          <option>Política</option>
          <option>Cultura</option>
          <option>Economía</option>
          <option>Internacional</option>
        </select>
      </label>

      {/* Editor principal */}
      <label
        htmlFor="content"
        className="flex flex-col gap-4  text-sm uppercase tracking-widest"
      >
        Cuerpo de la noticia
        <textarea
          name="content"
          id="content"
          className="w-full h-96 px-2 py-4 border border-black/20 text-lg leading-relaxed resize-none"
          placeholder="Comienza a escribir tu crónica aquí..."
        />
      </label>

      {/* Acciones */}
      <div className="flex gap-4 border-t border-black/20 pt-8">
        <button className="px-6 cursor-pointer py-3 bg-black text-white uppercase tracking-widest text-sm hover:bg-gray-800 transition-all">
          {isPending ? "Publicando..." : "Publicar ahora"}
        </button>
        <button className="px-6 cursor-pointer py-3 border border-black/20 uppercase tracking-widest text-sm hover:bg-black/5 transition-all">
          Guardar borrador
        </button>
      </div>
    </form>
  );
};
