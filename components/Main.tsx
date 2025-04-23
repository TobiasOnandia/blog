export const Posts = [
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

export const Main = () => {
  return (
    <main className="flex-1 max-w-7xl mx-auto  py-12 px-8 font-courier-prime">
      <div className="space-y-12">
        {Posts.map((post) => (
          <article
            key={post.id}
            className=" relative group hover:bg-gray-50 transition-all duration-300"
          >
            {/* Borde lateral estilo periódico */}
            <div className="absolute left-0 top-0 h-full w-px bg-black/20 group-hover:bg-black/40" />

            {/* Contenido */}
            <div className="pl-8 ml-2 py-6 border-b border-black/20">
              {/* Encabezado vertical */}
              <div className="absolute left-0 -translate-x-full pr-4 text-right w-24">
                <p className="text-xs text-gray-500 uppercase tracking-widest">
                  {post.category}
                </p>
                <time className="text-xs text-gray-400 mt-1 block">
                  {post.date}
                </time>
              </div>

              {/* Cuerpo principal */}
              <div className="space-y-4">
                {/* Titular con subrayado editorial */}
                <h3 className="text-3xl font-bold leading-tight pb-4 border-b border-black/20 relative">
                  {post.title}
                  <span className="absolute -bottom-[1px] left-0 w-24 h-[2px] bg-black"></span>
                </h3>

                {/* Contenido en columnas */}
                <div className="flex    gap-8">
                  {/* Columna imagen */}
                  <div className="flex-1/2 relative bg-gray-100 h-48">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      [Imagen]
                      <div className="absolute bottom-2 right-2 text-xs bg-white px-2 py-1">
                        Foto: {post.author}
                      </div>
                    </div>
                  </div>

                  {/* Columna texto */}
                  <div className="flex flex-col px-4 justify-between space-y-4">
                    <p className="text-lg text-gray-700 leading-relaxed text-justify ">
                      {post.excerpt}
                    </p>

                    {/* Cita destacada */}
                    <blockquote className="pl-4 border-l-4 border-black/20 italic text-gray-600">
                      "La innovación requiere visión y coraje para desafiar lo
                      establecido"
                    </blockquote>

                    {/* Acción y detalles */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-gray-500 space-y-1">
                        <p>Por {post.author}</p>
                        <p>Tiempo de lectura: 5 min</p>
                      </div>
                      <button
                        className=" cursor-pointer text-sm uppercase tracking-widest px-2 hover:underline 
                                   decoration-2 decoration-black/50 transition-all"
                      >
                        Continuar lectura ↓
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};
