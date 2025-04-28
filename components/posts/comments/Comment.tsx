import { useActionState, useState } from "react";
import { toast } from "sonner";
import { Comment as TComment } from "@prisma/client";
import { trpc } from "@/utils/trpc";

export interface CommentWithChildren extends TComment {
  author?: { name: string } | null;
  children?: CommentWithChildren[];
}

export const Comment = ({
  comment,
  depth = 0,
  allComments,
}: {
  comment: CommentWithChildren;
  depth?: number;
  allComments: CommentWithChildren[];
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const utils = trpc.useUtils();

  const marginLeft = depth * 16;

  const createCommentChildren = trpc.comment.create.useMutation({
    onSuccess: () => {
      utils.comment.byPost.invalidate(comment.postId);
      toast.success("Comentario creado exitosamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const [_, formAction, isLoading] = useActionState(
    (_: void | null, formData: FormData) => {
      const content = formData.get("content") as string;
      createCommentChildren.mutate({
        content,
        postId: comment.postId,
        authorId: comment.authorId,
        parentCommentId: comment.id,
      });
    },
    null
  );

  // Filtrar respuestas para este comentario
  const replies = allComments.filter((c) => c.parentCommentId === comment.id);

  return (
    <section
      className="relative  my-4 border-l-2 border-black/20 pl-4"
      style={{ marginLeft: `${marginLeft}px` }}
    >
      <p className="flex items-center gap-2 mb-1">
        <span className="font-medium">{comment.author?.name}</span>
        <time
          className="text-gray-600 text-sm"
          dateTime={comment.createdAt.toISOString()}
        >
          {comment.createdAt.toLocaleDateString("es-ES", {
            day: "numeric",
            month: "short",
          })}
        </time>
      </p>

      <p className="text-gray-800 mb-2">{comment.content}</p>

      <button
        onClick={() => setShowReplyForm(!showReplyForm)}
        className="text-sm text-black/60 hover:text-black/90 transition-colors"
      >
        ↳ Responder
      </button>

      {showReplyForm && (
        <form action={formAction} className="mt-2">
          <textarea
            name="content"
            className="w-full p-2 border border-black/20 text-sm"
            placeholder="Escribe tu respuesta..."
            rows={2}
          />
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="px-3 py-1 bg-black text-white text-sm hover:bg-gray-800"
            >
              {isLoading ? "Publicando..." : "Publicar"}
            </button>
            <button
              type="button"
              onClick={() => setShowReplyForm(false)}
              className="px-3 py-1 text-sm border border-black/20 hover:bg-black/5"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Renderizar respuestas */}
      {replies.map((reply) => (
        <Comment
          key={reply.id}
          comment={reply}
          depth={depth + 1}
          allComments={allComments}
        />
      ))}
    </section>
  );
};
