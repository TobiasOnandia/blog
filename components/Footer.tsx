export const Footer = () => {
  return (
    <footer className="border-t border-black/20 mt-24  relative z-20">
      <div className="mx-auto py-12 px-8 font-courier-prime relative">
        {/* Grid de contenido */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Columna 1 - Ediciones */}
          <div className="space-y-4">
            <h4 className="text-lg uppercase tracking-widest border-b border-black/20 pb-2">
              Últimas Ediciones
            </h4>
            <ul className="space-y-3 text-sm text-gray-600">
              {["Vol. XII No. 45", "Vol. XII No. 44", "Vol. XII No. 43"].map(
                (edition, index) => (
                  <li
                    key={index}
                    className="hover:pl-2 transition-all duration-300 hover:text-black cursor-help"
                    title="Archivo histórico"
                  >
                    {edition}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Columna 2 - Contacto */}
          <div className="space-y-4">
            <h4 className="text-lg uppercase tracking-widest border-b border-black/20 pb-2">
              Redacción
            </h4>
            <address className="not-italic text-sm text-gray-600 space-y-2">
              <p>Av. Corrientes 1234</p>
              <p>Buenos Aires, Argentina</p>
              <p className="mt-4">
                Email:{" "}
                <a
                  href="mailto:redaccion@cronicas.com"
                  className="hover:underline decoration-black/50"
                >
                  redaccion@cronicas.com
                </a>
              </p>
            </address>
          </div>

          {/* Columna 3 - Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg uppercase tracking-widest border-b border-black/20 pb-2">
              Suscripción
            </h4>
            <p className="text-sm text-gray-600">
              Recibe la edición matutina en tu correo
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tucorreo@ejemplo.com"
                className="flex-1 px-3 py-2 text-sm border border-black/20 bg-transparent placeholder-gray-400"
              />
              <button className="px-4 py-2 text-sm uppercase tracking-widest border border-black/20 hover:bg-black/5 transition-all duration-300">
                Suscribir
              </button>
            </div>
          </div>
        </div>

        {/* Divider decorativo */}
        <div className="my-8 border-t border-black/20 relative">
          <div className="absolute left-1/2 -translate-x-1/2 -top-3 text-sm text-gray-500 bg-[#fffcfc] px-4">
            · Crónicas Digitales ·
          </div>
        </div>

        {/* Pie inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div className="flex gap-6">
            <a href="/about" className="hover:underline decoration-black/50">
              Acerca de
            </a>
            <a href="/archive" className="hover:underline decoration-black/50">
              Archivo
            </a>
            <a href="/contact" className="hover:underline decoration-black/50">
              Contacto
            </a>
          </div>
          <div className="text-center md:text-right space-y-1">
            <p>© 2025 Crónicas Digitales</p>
            <p className="text-xs">ISSN 0123-4567</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
