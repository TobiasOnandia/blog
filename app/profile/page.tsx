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
    <div className="min-h-screen text-black/80 p-8 font-courier-prime">
      <div className=" border border-black/20 shadow-xl p-8">
        {/* Encabezado estilo portada */}
        <div className="border-b border-black/20 pb-6 mb-8">
          <div className="flex items-start justify-between">
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
          </div>
        </div>

        {/* Cuerpo en 2 columnas */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Columna izquierda - Información */}
          <div className="md:col-span-1 space-y-8">
            <div className="border border-black/20 p-4">
              <h3 className="text-lg uppercase tracking-widest border-b border-black/20 pb-2 mb-4">
                Datos personales
              </h3>

              {false ? (
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm uppercase mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.full_name}
                      className="w-full px-3 py-2 border border-black/20"
                    />
                  </div>
                  <button
                    type="button"
                    className="text-sm uppercase hover:underline decoration-black/50"
                  >
                    Guardar cambios
                  </button>
                </form>
              ) : (
                <div className="space-y-3 text-sm text-gray-700">
                  <p>{user?.full_name}</p>
                  <p>{user?.email}</p>
                  <button className="mt-4 text-sm uppercase hover:underline decoration-black/50">
                    Editar perfil
                  </button>
                </div>
              )}
            </div>

            <div className="border border-black/20 p-4">
              <h3 className="text-lg uppercase tracking-widest border-b border-black/20 pb-2 mb-4">
                Estadísticas
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                <li>Artículos publicados: 87</li>
                <li>
                  Última actividad: {new Date().toLocaleDateString("es-ES")}
                </li>
                <li>Ediciones colaboradas: 12</li>
              </ul>
            </div>
          </div>

          {/* Columna derecha - Actividad reciente */}
          <div className="md:col-span-2">
            <div className="border border-black/20 p-4">
              <h3 className="text-lg uppercase tracking-widest border-b border-black/20 pb-2 mb-6">
                Crónicas recientes
              </h3>

              <div className="space-y-6">
                {userPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group border-b border-black/20 pb-6 last:border-0 hover:bg-gray-50 transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-xl font-bold mb-2">{post.title}</h4>
                        <p className="text-sm text-gray-600">{post.excerpt}</p>
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
              </div>

              {userPosts.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                  Aún no has publicado ninguna crónica
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Pie de perfil */}
        <div className="mt-8 border-t border-black/20 pt-6 text-sm text-gray-500">
          <p>Perfil verificado - ISSN 0123-4567</p>
          <p className="mt-1">
            Última actualización: {new Date().toLocaleDateString("es-ES")}
          </p>
        </div>
      </div>
    </div>
  );
}
