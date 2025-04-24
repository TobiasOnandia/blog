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
    <main className="flex-1 space-y-12 max-w-7xl mx-auto py-12 px-8 font-courier-prime">
      {Posts.map((post) => (
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
              {post.date}
            </time>
          </header>

          {/* Cuerpo principal */}
          <article className="space-y-4  border-b transition-all duration-300  group-hover:border-black/60 border-black/20 py-6">
            {/* Titular con subrayado animado */}
            <h3
              className="text-3xl font-bold leading-tight pb-4 relative 
                               after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black 
                               after:w-24 after:transition-all after:duration-500 group-hover:after:w-full"
            >
              {post.title}
            </h3>

            {/* Contenido en columnas */}
            <section className="flex gap-8">
              {/* Columna imagen con efecto vintage */}
              <div
                className="flex-1/2  relative bg-gray-100 h-48 overflow-hidden 
                                group-hover:bg-gray-200/50 transition-all duration-500"
              >
                <figure
                  className="absolute inset-0 flex items-center justify-center text-gray-400 
                                  group-hover:scale-105 transition-transform duration-500"
                >
                  [Imagen]
                  <figcaption
                    className="absolute bottom-2 right-2 text-xs bg-white px-2 py-1 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Foto: {post.author}
                  </figcaption>
                </figure>
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
                                         group-hover:border-sky-600 group-hover:translate-x-2 
                                         transition-all duration-500"
                >
                  "La innovación requiere visión y coraje para desafiar lo
                  establecido"
                </blockquote>

                {/* Acción y detalles */}
                <footer className="flex items-center justify-between mt-4">
                  <div>
                    <p
                      className="text-sm text-gray-500 space-y-1 
                                group-hover:text-gray-600 transition-colors"
                    >
                      Por {post.author}
                    </p>
                    <p
                      className="text-sm text-gray-500 space-y-1 
                                group-hover:text-gray-600 transition-colors"
                    >
                      Tiempo de lectura: 5 min
                    </p>
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
                </footer>
              </div>
            </section>
          </article>
        </article>
      ))}
    </main>
  );
};
