"use client";
import { trpc } from "@/utils/trpc";
import { Comment } from "./Comment";

export const Comments = ({ id }: { id: string }) => {
  const { data } = trpc.comment.byPost.useQuery(id);

  const topLevelComments =
    data?.filter((comment) => !comment.parentCommentId) || [];

  return (
    <article className="space-y-6">
      {topLevelComments.map((comment) => (
        <Comment key={comment.id} comment={comment} allComments={data || []} />
      ))}
    </article>
  );
};
