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
    <main className="flex-1 max-w-7xl mx-auto py-12 px-8 font-courier-prime">
      <div className="space-y-12">
        {Posts.map((post) => (
          <article
            key={post.id}
            className="relative group transition-all duration-500 hover:z-10"
            style={{
              background: "inherit", // Mantiene el patrón de fondo
            }}
          >
            {/* Borde lateral interactivo */}
            <div className="absolute left-0 top-0 h-full w-px bg-black/20 group-hover:bg-black/60 transition-all duration-300 group-hover:scale-x-150 origin-bottom" />

            {/* Efecto de relieve al hover */}
            <div className="absolute inset-0 shadow-[inset_0_0_15px_rgba(0,0,0,0.02)] group-hover:shadow-[inset_0_0_25px_rgba(0,0,0,0.04)] transition-shadow duration-300" />

            {/* Contenido */}
            <div className="pl-8 ml-2 py-6 border-b border-black/20 group-hover:border-black/40 transition-all">
              {/* Encabezado vertical con hover */}
              <div className="absolute left-0 -translate-x-full pr-4 text-right w-24 group-hover:-translate-x-[110%] transition-transform duration-500">
                <p className="text-xs text-gray-500 uppercase tracking-widest group-hover:text-black transition-colors">
                  {post.category}
                </p>
                <time className="text-xs text-gray-400 mt-1 block group-hover:text-black/60 transition-colors">
                  {post.date}
                </time>
              </div>

              {/* Cuerpo principal */}
              <div className="space-y-4">
                {/* Titular con subrayado animado */}
                <h3
                  className="text-3xl font-bold leading-tight pb-4 relative 
                               after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black 
                               after:w-24 after:transition-all after:duration-500 group-hover:after:w-full"
                >
                  {post.title}
                </h3>

                {/* Contenido en columnas */}
                <div className="flex gap-8">
                  {/* Columna imagen con efecto vintage */}
                  <div
                    className="flex-1/2 relative bg-gray-100 h-48 overflow-hidden 
                                group-hover:bg-gray-200/50 transition-all duration-500"
                  >
                    <div
                      className="absolute inset-0 flex items-center justify-center text-gray-400 
                                  group-hover:scale-105 transition-transform duration-500"
                    >
                      [Imagen]
                      <div
                        className="absolute bottom-2 right-2 text-xs bg-white px-2 py-1 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        Foto: {post.author}
                      </div>
                    </div>
                    <div className="absolute inset-0 mix-blend-multiply bg-[#fffcfc] opacity-50" />
                  </div>

                  {/* Columna texto */}
                  <div className="flex flex-col px-4 justify-between space-y-4">
                    <p
                      className="text-lg text-gray-700 leading-relaxed text-justify 
                               group-hover:text-gray-800 transition-colors duration-300"
                    >
                      {post.excerpt}
                    </p>

                    {/* Cita destacada interactiva */}
                    <blockquote
                      className="pl-4 border-l-4 border-black/20 italic text-gray-600 
                                         group-hover:border-black/60 group-hover:translate-x-2 
                                         transition-all duration-500"
                    >
                      "La innovación requiere visión y coraje para desafiar lo
                      establecido"
                    </blockquote>

                    {/* Acción y detalles */}
                    <div className="flex items-center justify-between mt-4">
                      <div
                        className="text-sm text-gray-500 space-y-1 
                                   group-hover:text-gray-600 transition-colors"
                      >
                        <p>Por {post.author}</p>
                        <p>Tiempo de lectura: 5 min</p>
                      </div>
                      <button
                        className="cursor-pointer text-sm uppercase tracking-widest px-2 
                                      relative overflow-hidden
                                      before:absolute before:bottom-0 before:left-0 before:w-full 
                                      before:h-[1px] before:bg-black/30 before:transition-all
                                      hover:before:h-[2px] hover:before:bg-black/60
                                      hover:tracking-[0.15em] transition-all duration-300"
                      >
                        <span className="relative">
                          Continuar lectura
                          <span
                            className="absolute -right-4 opacity-0 group-hover:opacity-100 
                                        group-hover:-right-5 transition-all duration-300"
                          >
                            ↓
                          </span>
                        </span>
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
