"use client";
import { trpc } from "@/utils/trpc";

export const Comments = ({ id }: { id: string }) => {
  const { data } = trpc.comment.byPost.useQuery(id);

  return (
    <>
      {data?.map((comment) => {
        return (
          <section
            key={comment.id}
            className="border-l-2 mb-4 border-black/20 pl-4"
          >
            <span>{comment.author?.name}</span>
            <time
              className="text-gray-600 text-sm ml-4"
              dateTime={comment.createdAt.toISOString()}
            >
              {comment.createdAt.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <p className="text-gray-500 italic">{comment.content}</p>
          </section>
        );
      })}
    </>
  );
};
