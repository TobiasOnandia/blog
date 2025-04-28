import { ViewAllPost } from "@/types/PostType";

export const ViewPosts = ({ post }: ViewAllPost) => {
  return (
    <article className="space-y-4  border-b transition-all duration-300  group-hover:border-black/60 border-black/20 py-6">
      <h3
        className="text-3xl font-bold leading-tight pb-4 relative 
                       after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black 
                       after:w-24 after:transition-all after:duration-500 group-hover:after:w-full"
      >
        {post.title}
      </h3>

      <section className="flex gap-8">
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
              Foto: {post.author?.name}
            </figcaption>
          </figure>
        </div>

        {/* Columna texto */}
        <div className="flex flex-col px-4 justify-between space-y-4">
          <p
            className="text-lg text-gray-700 leading-relaxed text-justify 
                       group-hover:text-gray-800 transition-colors duration-300"
          >
            {post.content as string}
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
                Por {post.author?.name}
              </p>
              <p
                className="text-sm text-gray-500 space-y-1 
                        group-hover:text-gray-600 transition-colors"
              >
                Tiempo de lectura: 5 min
              </p>
            </div>
            <a
              href={`posts/${post.id}`}
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
            </a>
          </footer>
        </div>
      </section>
    </article>
  );
};
