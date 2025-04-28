"use client";

import { useUser } from "@/hooks/useUser";
import { trpc } from "@/utils/trpc";
import { User } from "@supabase/supabase-js";
import { Dislike } from "./dislike/DisLike";
import { Likes } from "./likes/Likes";

export const Votes = ({ postId }: { postId: string }) => {
  const { data: votes } = trpc.votes.byPost.useQuery(postId);
  const user = useUser();

  const isLiked = votes?.some((vote) => vote.authorId === (user as User).id);

  return <>{isLiked ? <Dislike id={postId} /> : <Likes postId={postId} />}</>;
};
