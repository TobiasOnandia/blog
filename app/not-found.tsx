export default function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center py-12 px-4 font-courier-prime ">
      <div className="max-w-2xl w-full text-center">
        {/* Encabezado estilo periódico */}
        <div className="mb-8 border-b border-black/20 pb-4">
          <h1 className="text-8xl font-bold mb-4">404</h1>
          <div className="flex justify-between items-center text-sm uppercase tracking-widest">
            <span>Error de navegación</span>
            <span>
              {new Date().toLocaleDateString("es-ES", { dateStyle: "short" })}
            </span>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="prose mx-auto mb-8">
          <h2 className="text-3xl font-bold mb-4">PÁGINA NO ENCONTRADA</h2>
          <p className="text-gray-600 mb-6">
            La dirección solicitada no se encuentra en nuestro archivo
            periodístico
          </p>

          {/* Ilustración estilo editorial */}
          <div className="my-12 relative">
            <div className="absolute inset-0 border-2 border-black/20"></div>
            <div className="relative bg-white p-8 -translate-x-2 -translate-y-2">
              <img
                src="/404-illustration.svg"
                alt="Página no encontrada"
                className="w-64 mx-auto opacity-80"
              />
            </div>
          </div>

          {/* Posibles causas */}
          <div className="bg-yellow-50 p-6 border border-black/20 text-left mb-8">
            <h3 className="text-sm uppercase tracking-widest mb-4">
              Posibles causas:
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Enlace dañado o desactualizado</li>
              <li>Error tipográfico en la URL</li>
              <li>Contenido archivado o eliminado</li>
            </ul>
          </div>
        </div>

        {/* Acciones */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/"
            className="px-6 py-3 bg-black text-white uppercase tracking-widest text-sm hover:bg-gray-800 transition-all"
          >
            Volver a la portada
          </a>
          <a
            href="/archivo"
            className="px-6 py-3 border border-black/20 uppercase tracking-widest text-sm hover:bg-black/5 transition-all"
          >
            Buscar en el archivo
          </a>
        </div>

        {/* Pie de página */}
        <div className="mt-12 border-t border-black/20 pt-8 text-sm text-gray-600">
          <p>
            Si el problema persiste, contacte a nuestro equipo editorial:
            <a href="mailto:redaccion@cronicas.com" className="underline ml-2">
              redaccion@cronicas.com
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
