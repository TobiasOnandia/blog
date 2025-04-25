"use client";
import {
  ArrowUpIcon,
  ChartBarIcon,
  ChartBubbleIcon,
  DotsIcon,
  PencilIcon,
} from "@/components/icons";
import { useUser } from "@/hooks/useUser";
import { trpc } from "@/utils/trpc";
import { User } from "@supabase/supabase-js";

export const PostByUser = () => {
  const user = useUser();
  const userId = (user as User).id;
  const userPosts = trpc.post.byUser.useQuery(userId);

  if (userPosts.data === undefined) {
    return (
      <div>
        <p>No hay posts</p>
      </div>
    );
  }

  return (
    <>
      {userPosts.data.map((post) => (
        <article
          key={post.id}
          className="group relative mb-4 border-l-2 border-black/20 pl-6 py-6 hover:border-black/40 transition-all duration-300"
        >
          <section className="flex flex-col md:flex-row justify-between gap-4">
            {/* Contenido principal */}
            <div className="flex-1">
              <p className="mb-2 flex items-center gap-3">
                <span className="bg-black/5 px-3 py-1 text-xs uppercase tracking-widest">
                  {post.category}
                </span>
                <time className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </p>

              <h4 className="text-2xl font-bold leading-tight mb-2 hover:text-black/80 transition-colors">
                {post.title}
              </h4>

              <p className="text-gray-700 line-clamp-2 mb-4">
                {post.content as string}
                <button className="ml-2 text-black/60 hover:text-black/90 transition-colors">
                  → Leer más
                </button>
              </p>
            </div>

            {/* Metadatos y acciones */}
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <PencilIcon className="w-6 h-6 text-black/60 hover:text-black/90" />
              </button>
              <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <ArrowUpIcon className="w-6 h-6 text-black/60 hover:text-black/90" />
              </button>
              <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <DotsIcon className="w-6 h-6 text-black/60 hover:text-black/90" />
              </button>
            </div>
          </section>

          {/* Efecto hover */}
          <div className="absolute inset-0 -z-10 group-hover:bg-black/3 transition-colors duration-300" />
        </article>
      ))}
    </>
  );
};
