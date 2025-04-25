"use client";

import { HeartIcon } from "@/components/icons";
import { useUser } from "@/hooks/useUser";
import { trpc } from "@/utils/trpc";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

export const Votes = ({ postId }: { postId: string }) => {
  const user = useUser();

  const utils = trpc.useUtils();
  const createVoteMutation = trpc.votes.like.useMutation({
    onSuccess: () => {
      utils.votes.byPost.invalidate();
      toast.success("Voto guardado exitosamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleLike = async () => {
    await createVoteMutation.mutateAsync({
      postId,
      authorId: (user as User).id,
    });
  };

  const { data: votes } = trpc.votes.byPost.useQuery(postId);

  return (
    <>
      <button
        onClick={handleLike}
        className="p-2 flex gap-4 items-center mb-8 rounded-full hover:bg-black/5 transition-all"
        aria-label="Votar positivo"
      >
        <HeartIcon className="w-6 h-6" />
        <span className="font-courier-prime text-xl font-bold text-black/80 border-l-2 border-black/20 pl-3">
          {votes?.length ?? 0}
          <span className="block text-xs font-normal uppercase tracking-widest text-black/60">
            Apoyos
          </span>
        </span>
      </button>
    </>
  );
};
