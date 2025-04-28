import { FormLogin } from "@/components/auth/login/FormLogin";
import { SignInWithGoogle } from "@/components/auth/SignInWithGoogle";

export default function Page() {
  return (
    <main className="min-h-screen py-8 flex items-center justify-center ">
      <section className="w-full  border-2 border-black/20 relative p-8 md:p-12  shadow-lg">
        <header className="mb-8 border-b-2 border-black pb-4 text-center md:text-left">
          <h1 className="text-3xl md:text-6xl first-letter:text-sky-600 font-bold uppercase leading-none">
            Crónicas Digitales
          </h1>

          <p className="text-lg text-gray-600 mt-4">
            Edición especial de acceso
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          <article className="space-y-8 order-2 md:order-1">
            <section className="border-2 border-black p-6 relative">
              <span className="absolute -top-3 left-4 bg-white px-2 text-sm uppercase">
                Exclusivo
              </span>
              <h3 className="text-xl md:text-2xl font-bold mb-4">
                Bienvenido al Círculo Editorial
              </h3>
              <p className="text-gray-700 leading-relaxed text-justify">
                Como miembro registrado, tendrás acceso exclusivo a:
              </p>
              <ul className="mt-4 *:first-letter:text-sky-600 space-y-2 text-sm text-gray-600 list-disc pl-4">
                <li>Artículos premium</li>
                <li>Ediciones especiales</li>
                <li>Archivo histórico</li>
                <li>Herramientas de publicación</li>
              </ul>
            </section>
            <p className="border-t-2 flex flex-col border-black/20 pt-6 text-sm uppercase text-gray-600">
              <span>Fecha actual:</span>
              <time className="text-lg text-neutral-950">
                {new Date().toLocaleDateString("es-ES", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </p>
          </article>
          {/* Columna Derecha: Formulario de Acceso */}
          <article className="bg-transparent rounded order-1 md:order-2">
            <h2 className="text-3xl font-bold uppercase mb-6 first-letter:text-sky-600">
              Acceso
            </h2>
            <FormLogin />
            <div className="my-6 md:my-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/20"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm uppercase text-gray-600">
                  continuar con
                </span>
              </div>
            </div>
            <SignInWithGoogle
              className="w-full py-3 cursor-pointer flex gap-2 items-center justify-center bg-white border-2 border-black/20 uppercase tracking-widest
                    hover:border-black/60 hover:bg-black/5 transition-all duration-300"
            />
            {/* Usar el componente real */}
            <footer className="flex flex-col mt-6 md:mt-8">
              <a
                href="/register"
                className="text-sm text-center space-y-2 hover:underline decoration-2 decoration-black/60"
              >
                ¿Nuevo colaborador? Registrate
              </a>
              <p className="text-sm text-gray-600 mt-4 text-center md:text-left">
                <a href="/password-reset" className="hover:underline">
                  Recuperar acceso
                </a>
              </p>
            </footer>
          </article>
        </div>
        <p className="mt-12 text-center text-sm text-gray-500">
          ISSN 0123-4567 | Todos los derechos reservados
        </p>
      </section>
    </main>
  );
}
