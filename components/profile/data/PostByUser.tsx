"use client";
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
          className="group border-b mb-6 border-black/20 pb-6 last:border-0 hover:bg-gray-50 transition-all"
        >
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-xl font-bold mb-2">{post.title}</h4>
              {/* <p className="text-sm text-gray-600">{post.excerpt}</p> */}
            </div>
            <span className="text-xs text-gray-500 ml-4">
              {new Date().toLocaleDateString("es-ES")}
            </span>
          </div>
          <div className="mt-4 flex items-center gap-4 text-xs uppercase">
            <button className="hover:underline decoration-black/50">
              Editar
            </button>
            <button className="hover:underline decoration-black/50">
              Estadísticas
            </button>
            <button className="hover:underline decoration-black/50">
              Compartir
            </button>
          </div>
        </article>
      ))}
    </>
  );
};
