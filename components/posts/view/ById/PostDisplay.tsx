import { HeartIcon } from "@/components/icons";
import { AppRouter } from "@/server/routers/_app";
import { inferRouterOutputs } from "@trpc/server";
import { Comments } from "@/components/posts/comments/Comments";
import { FormComment } from "@/components/posts/comments/create/FormComment";

type RouterOutput = inferRouterOutputs<AppRouter>;
type PostType = RouterOutput["post"]["byId"];

interface PostDisplayProps {
  post: PostType;
}

export const PostDisplay = ({ post }: PostDisplayProps) => {
  if (!post) {
    return <div>Error al mostrar el post.</div>;
  }

  return (
    <article className=" mx-auto py-12 px-4 md:px-0">
      {/* Encabezado */}
      <header className="border-b border-black/20 pb-6 mb-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm uppercase tracking-widest">
          {post.category && (
            <span className="bg-black text-white px-3 py-1">
              {post.category}
            </span>
          )}
          {post.createdAt && ( 
            <time dateTime={post.createdAt.toISOString()}>
              {post.createdAt.toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          {post.title}
        </h1>
        {post.author?.name && (
          <p className="mt-4 text-gray-600">Por {post.author.name}</p>
        )}
      </header>

      {/* Contenido principal */}
      <p className="prose prose-lg max-w-none mb-12 border-b border-black/20 pb-12">
        {post.content as string}
      </p>

      {/* Sistema de votos (Placeholder) */}
      <div className="flex items-center gap-6 mb-12">
        <button
          className="p-2 rounded-full hover:bg-black/5 transition-all"
          aria-label="Votar positivo"
        >
          <HeartIcon className="w-6 h-6" />
        </button>
        <span className="text-xl font-bold">9</span>
      </div>

      {/* Sección de comentarios (Placeholder) */}
      <section>
        <h2 className="text-2xl font-bold mb-8 border-b border-black/20 pb-2">
          Conversación {/* Conteo real de comentarios */}
        </h2>

        {/* Formulario de Comentarios (Necesitaría ser un Componente Cliente) */}
        <FormComment />
        {/* Aquí iría el mapeo de comentarios reales */}
        <Comments />
      </section>
    </article>
  );
};
