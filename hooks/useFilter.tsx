import { trpc } from "@/utils/trpc";
import { useSearchParams } from "next/navigation";

export const useFilter = () => {
  const searchQuery = useSearchParams().get("search") || "";
  const { data } = trpc.post.list.useQuery();
  const posts = data?.posts ?? [];

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return filteredPosts;
};
