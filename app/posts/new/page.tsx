import { FormPost } from "@/components/posts/FormPost";

export default function CreatePost() {
  return (
    <main className=" mx-auto pt-4 font-courier-prime">
      {/* Encabezado estilo editorial */}
      <header className="border-b border-black/20 pb-6 mb-8">
        <h1 className="text-4xl font-bold uppercase tracking-tight">
          Nueva Crónica
        </h1>
        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
          <p>Redactor: Juan Pérez</p>
          <span>•</span>
          <time>
            {new Date().toLocaleDateString("es-ES", { dateStyle: "long" })}
          </time>
        </div>
      </header>

      {/* Formulario minimalista */}
      <FormPost />
      {/* Notas al pie */}
      <footer className="mt-12 border-t border-black/20 pt-8 text-sm text-gray-600">
        <p className="uppercase tracking-widest mb-2">
          Instrucciones editoriales:
        </p>
        <ul className="list-disc pl-4 space-y-2">
          <li>Mínimo 800 palabras</li>
          <li>Incluir al menos 2 fuentes verificadas</li>
          <li>Etiquetar con máximo 3 categorías</li>
        </ul>
      </footer>
    </main>
  );
}
