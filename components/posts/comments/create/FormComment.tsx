"use client";
import { trpc } from "@/utils/trpc";
import { useActionState } from "react";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";
import { User } from "@supabase/supabase-js";

export const FormComment = ({ id }: { id: string }) => {
  const utils = trpc.useUtils();
  const user = useUser();

  const createCommentMutation = trpc.comment.create.useMutation({
    onSuccess: () => {
      utils.comment.byPost.invalidate(id);
      toast.success("Comentario creado exitosamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [state, formAction, isPending] = useActionState(
    (_: void | null, formData: FormData) => {
      const { content } = Object.fromEntries(formData.entries());

      if (!content) {
        toast.error("Por favor, escribe un comentario");
        return;
      }

      try {
        createCommentMutation.mutateAsync({
          content: content as string,
          authorId: (user as User).id,
          postId: id,
        });
      } catch (error) {
        toast.error("Error al crear el comentario");
      }
    },
    null
  );

  return (
    <form action={formAction} className="mb-12">
      <textarea
        className="w-full p-4 border resize-none border-black/20 mb-4 rounded focus:outline-none focus:ring-1 focus:ring-black/50"
        placeholder="Escribe tu comentario..."
        rows={3}
        name="content"
        aria-label="Nuevo comentario"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-black text-white uppercase tracking-widest text-sm hover:bg-gray-800 rounded transition-colors disabled:opacity-50"
      >
        {isPending ? "Publicando..." : "Publicar comentario"}
      </button>
    </form>
  );
};
