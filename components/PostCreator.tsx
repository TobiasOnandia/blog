"use client";

import { trpc } from "@/utils/trpc";
import { useState } from "react";

export function PostCreator() {
  const [post, setPost] = useState({
    title: "",
    content: "",
  });

  const utils = trpc.useUtils();

  const createPostMutation = trpc.post.create.useMutation({
    onSuccess: () => {
      setPost({ title: "", content: "" });
      utils.post.list.invalidate();
      alert("¡Post creado!");
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createPostMutation.mutate({ title: post.title, content: post.content });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-4 border rounded"
    >
      <input
        type="text"
        placeholder="Título"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        className="border p-2 rounded"
        disabled={createPostMutation.isPending}
      />
      <textarea
        placeholder="Contenido"
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
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
