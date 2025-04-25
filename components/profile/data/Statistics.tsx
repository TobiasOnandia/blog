"use client";
import { useUser } from "@/hooks/useUser";
import { trpc } from "@/utils/trpc";
import { User } from "@supabase/supabase-js";

export const Statistics = () => {
  const user = useUser() as User;

  const posts = trpc.post.byUser.useQuery(user.id);

  return (
    <article className="border border-black/20 p-4">
      <h3 className="text-lg uppercase tracking-widest border-b border-black/20 pb-2 mb-4">
        Estadísticas
      </h3>
      <ul className="space-y-3 text-sm text-gray-700">
        <li>Artículos publicados: {posts.data?.length ?? 0}</li>
        <li>Última actividad: {new Date().toLocaleDateString("es-ES")}</li>
        <li>Ediciones colaboradas: 0</li>
      </ul>
    </article>
  );
};
