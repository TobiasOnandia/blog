"use client";
import { ViewPosts } from "@/components/posts/view/ViewPosts";
import { trpc } from "@/utils/trpc";

export const Main = () => {
  const { data } = trpc.post.list.useQuery();

  return (
    <main className="flex-1 space-y-12 max-w-7xl mx-auto py-12 px-8 font-courier-prime">
      {data?.posts?.map((post) => (
        <article
          key={post.id}
          className="relative group  border-black/20 transition-all duration-300  hover:border-sky-600 pl-8   border-l-2 origin-bottom"
        >
          {/* Encabezado vertical con hover */}
          <header className="absolute  left-0 -translate-x-full pr-4 text-right w-24 group-hover:-translate-x-[110%] transition-transform duration-500">
            <p className="text-xs text-gray-500 uppercase tracking-widest group-hover:text-black transition-colors">
              {post.category}
            </p>
            <time className="text-xs text-gray-400 mt-1 block group-hover:text-black/60 transition-colors">
              {post.createdAt.toDateString()}
            </time>
          </header>

          {/* Cuerpo principal */}
          <ViewPosts post={post} />
        </article>
      ))}
    </main>
  );
};
