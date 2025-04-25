"use client";
import { PostByUser } from "@/components/profile/data/PostByUser";
import { Statistics } from "@/components/profile/data/Statistics";
import { UserProfile } from "@/components/profile/data/UserProfile";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";

export default function ProfilePage() {
  const user = useUser() as User;
  const supabase = createClient();
  return (
    <main className="min-h-screen text-black/80 p-8 font-courier-prime border border-black/20 shadow-xl ">
      {/* Encabezado estilo portada */}
      <header className="border-b border-black/20 pb-6 mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-widest">
            {user?.app_metadata?.name || "Perfil"}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Miembro desde:{" "}
            {new Date(user?.created_at).toLocaleDateString("es-ES")}
          </p>
        </div>
        <button
          onClick={() => supabase.auth.signOut()}
          className="text-sm uppercase hover:underline decoration-black/50"
        >
          Cerrar sesión
        </button>
      </header>

      {/* Cuerpo en 2 columnas */}
      <article className="grid md:grid-cols-3 gap-8">
        {/* Columna izquierda - Información */}
        <section className="md:col-span-1 space-y-8">
          <UserProfile />
          <Statistics />
        </section>

        {/* Columna derecha - Actividad reciente */}
        <section className="md:col-span-2 border  border-black/20 p-4">
          <h3 className="text-lg uppercase tracking-widest border-b border-black/20 pb-2 mb-6">
            Crónicas recientes
          </h3>

          <PostByUser />
        </section>
      </article>

      {/* Pie de perfil */}
      <footer className="mt-8 border-t border-black/20 pt-6 text-sm text-gray-500">
        <p>Perfil verificado - ISSN 0123-4567</p>
        <p className="mt-1">
          Última actualización: {new Date().toLocaleDateString("es-ES")}
        </p>
      </footer>
    </main>
  );
}
