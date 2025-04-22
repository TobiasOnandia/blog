// src/app/components/PostCreator.tsx (Ejemplo)
"use client";

import { trpc } from "@/utils/trpc";
import { useState } from "react";

export function PostCreator() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const utils = trpc.useUtils(); // Para invalidar caché

  const createPostMutation = trpc.post.create.useMutation({
    onSuccess: () => {
      // Limpiar formulario
      setTitle("");
      setContent("");
      // Invalidar la query de la lista de posts para refrescar
      utils.post.list.invalidate();
      alert("¡Post creado!");
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPostMutation.mutate({ title, content });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-4 border rounded"
    >
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded"
        disabled={createPostMutation.isPending}
      />
      <textarea
        placeholder="Contenido"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 rounded"
        disabled={createPostMutation.isPending}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        disabled={createPostMutation.isPending}
      >
        {createPostMutation.isPending ? "Creando..." : "Crear Post"}
      </button>
      {createPostMutation.isError && (
        <p className="text-red-500">{createPostMutation.error.message}</p>
      )}
    </form>
  );
}
