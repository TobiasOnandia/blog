import { SignInWithGoogle } from "@/components/auth/SignInWithGoogle";

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 font-courier-prime"
      style={{
        background: "#fffcfc",
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/soft-wallpaper.png")',
      }}
    >
      <div
        className="w-full max-w-4xl bg-white/95 backdrop-blur-sm border-2 border-black shadow-2xl p-8 
                      grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Columna izquierda - Estilo portada periódico */}
        <div className="md:col-span-1 border-r-2 border-black pr-8">
          <div className="mb-6">
            <h1 className="text-5xl font-bold uppercase leading-none border-b-2 border-black pb-2">
              Crónicas
              <br />
              Digitales
            </h1>
            <p className="text-xs text-gray-600 mt-2">Edición Especial</p>
          </div>

          <div className="space-y-4 text-sm">
            <div className="border border-black p-3 relative">
              <span className="absolute -top-2 left-2 bg-white px-2 text-xs uppercase">
                Clasificado
              </span>
              <p className="italic">
                "La innovación tecnológica requiere acceso seguro"
              </p>
            </div>

            <div className="border-t-2 border-black pt-4">
              <p className="text-xs uppercase">Fecha de publicación:</p>
              <p className="text-sm">
                {new Date().toLocaleDateString("es-ES", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Columna derecha - Formulario */}
        <div className="md:col-span-2">
          <div className="mb-8">
            <h2 className="text-3xl font-bold uppercase border-b-2 border-black pb-2">
              Acceso de Corresponsal
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Sección de Credenciales - Vol. XII No.45
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm uppercase tracking-widest mb-2">
                Telegrama Electrónico
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border-2 border-black focus:ring-2 focus:ring-black/20"
                placeholder="ejemplo@cronicas.com"
              />
            </div>

            <div>
              <label className="block text-sm uppercase tracking-widest mb-2">
                Código Secreto
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border-2 border-black focus:ring-2 focus:ring-black/20"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-black text-white uppercase tracking-widest 
                        hover:bg-gray-800 transition-all duration-300 border-2 border-black"
            >
              Autorizar Acceso
            </button>
          </form>

          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-black"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm uppercase">O bien</span>
            </div>
          </div>

          <SignInWithGoogle
          // className="w-full py-3 bg-white border-2 border-black uppercase tracking-widest
          //           hover:bg-black hover:text-white transition-all duration-300"
          />

          <div className="mt-8 text-center space-y-2">
            <button className="text-sm hover:underline decoration-2 decoration-black">
              ¿Nuevo corresponsal? Solicite credenciales
            </button>
            <p className="text-xs text-gray-600 mt-4">
              Sistema de autenticación protegido por el ISSN 0123-4567
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
