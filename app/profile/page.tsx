import { PostByUser } from "@/components/profile/data/PostByUser";
import { Statistics } from "@/components/profile/data/Statistics";
import { UserProfile } from "@/components/profile/data/UserProfile";

const user = {
  id: 1,
  email: "usuario@example.com",
  full_name: "Usuario Ejemplo",
  username: "usuario",
  created_at: new Date().toISOString(),
};

const userPosts = [
  {
    id: 1,
    title: "Escándalo financiero sacude Buenos Aires",
    category: "Economía",
    date: "12 Enero 2024",
    content:
      "Fuentes cercanas al gobierno revelan compleja trama de corrupción que involucra altos funcionarios...",
    excerpt:
      "En un giro inesperado, la investigación sobre fondos desviados lleva el caso a instancias internacionales.",
    author: "Pepe",
  },
  {
    id: 2,
    title: "Avance revolucionario en energía sustentable",
    category: "Ciencia",
    date: "11 Enero 2024",
    content:
      "Equipo de investigadores argentinos desarrolla nuevo método para almacenamiento de energía solar...",
    excerpt:
      "La tecnología promete reducir costos operacionales en un 40% según reportes preliminares.",
    author: "Pepe",
  },
  {
    id: 3,
    title: "Nueva corriente artística emerge en Córdoba",
    category: "Cultura",
    date: "10 Enero 2024",
    content:
      "Colectivo de artistas urbanos redefine el concepto de espacio público con instalaciones interactivas...",
    excerpt:
      "Críticos destacan fusión única entre tradición local y vanguardismo tecnológico.",
    author: "Pepe",
  },
];

export default function ProfilePage() {
  return (
    <main className="min-h-screen text-black/80 p-8 font-courier-prime border border-black/20 shadow-xl ">
      {/* Encabezado estilo portada */}
      <header className="border-b border-black/20 pb-6 mb-8 flex items-start justify-between">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-widest">
            {user?.username || "Perfil"}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Miembro desde:{" "}
            {new Date(user?.created_at).toLocaleDateString("es-ES")}
          </p>
        </div>
        <button
          // onClick={() => supabase.auth.signOut()}
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
        <section className="md:col-span-2 border border-black/20 p-4">
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
