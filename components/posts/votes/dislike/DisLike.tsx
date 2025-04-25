import { HeartFillIcon } from "@/components/icons";
import { useUser } from "@/hooks/useUser";
import { trpc } from "@/utils/trpc";
import { User } from "@supabase/supabase-js";
import { toast } from "sonner";

export const Dislike = ({ id }: { id: string }) => {
  const user = useUser();
  const utils = trpc.useUtils();

  const unlikeMutation = trpc.votes.dislike.useMutation({
    onSuccess: () => {
      utils.votes.byPost.invalidate();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleClick = () => {
    unlikeMutation.mutate({
      postId: id,
      authorId: (user as User).id,
    });
  };
  const { data: votes } = trpc.votes.byPost.useQuery(id);

  return (
    <button
      onClick={handleClick}
      className="p-2 flex gap-4 cursor-pointer items-center mb-8 rounded-full hover:bg-black/5 transition-all"
    >
      <HeartFillIcon className="w-6 h-6 text-red-500" />
      <span className="font-courier-prime text-xl font-bold text-black/80 border-l-2 border-black/20 pl-3">
        {votes?.length ?? 0}
        <span className="block text-xs font-normal uppercase tracking-widest text-black/60">
          Apoyos
        </span>
      </span>
    </button>
  );
};
