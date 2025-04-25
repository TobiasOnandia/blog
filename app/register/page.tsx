import { RegisterForm } from "@/components/auth/register/formRegister";
import { SignInWithGoogle } from "@/components/auth/SignInWithGoogle";

export default function Register() {
  return (
    <main className="min-h-screen  w-full   border border-black/20  p-8 justify-center  ">
      <header className="mb-8 border-b-2 border-black pb-4">
        <h1 className="text-4xl first-letter:text-sky-600 md:text-5xl font-bold uppercase">
          Registro
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Nuevo Colaborador • Edición {new Date().getFullYear()}
        </p>
        <p className="text-xs text-gray-500 self-end">ISSN 0123-4567</p>
      </header>

      <main className="grid md:grid-cols-2 gap-8">
        {/* Columna izquierda - Beneficios */}
        <section className="space-y-6 border-r-0 md:border-r-2 border-black/20 pr-0 md:pr-8">
          <article className="border-2 border-black p-4 bg-yellow-50 relative">
            <span className="absolute -top-3 left-4 bg-black text-white px-2 text-xs uppercase">
              Ventajas
            </span>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-lg">✒︎</span>
                <div>
                  <h3 className="font-semibold">Acceso Completo</h3>
                  <p className="text-xs">
                    Artículos exclusivos y archivo histórico
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">📰</span>
                <div>
                  <h3 className="font-semibold">Ediciones Premium</h3>
                  <p className="text-xs">
                    Contenido antes de su publicación general
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-lg">🔐</span>
                <div>
                  <h3 className="font-semibold">Seguridad Garantizada</h3>
                  <p className="text-xs">
                    Protección de datos de última generación
                  </p>
                </div>
              </li>
            </ul>
          </article>

          <p className="text-xs text-gray-600">
            "La información veraz es el pilar de la democracia"
          </p>
          <p className="text-sm mt-1">- Código Ético, Art. 12</p>
        </section>

        {/* Columna derecha - Formulario */}
        <section className="">
          <RegisterForm />
          <div className="my-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-black/20"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-white px-4 text-sm uppercase text-gray-600">
                Registro con
              </span>
            </div>
          </div>

          <SignInWithGoogle
            className="w-full py-3 flex justify-center items-center gap-3 bg-white border-2 border-black/20 uppercase 
                        tracking-widest hover:border-black/60 hover:bg-black/5"
          />

          <p className="text-center text-sm text-gray-600 mt-6">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="hover:underline decoration-black/60">
              Acceso de colaborador
            </a>
          </p>
        </section>
      </main>

      {/* Pie de página */}
      <footer className="mt-8 pt-4 border-t border-black/20 text-xs text-gray-600">
        <p className="text-center">
          Al registrarse acepta nuestros{" "}
          <a href="/terms" className="hover:underline">
            Términos del Servicio
          </a>
        </p>
      </footer>
    </main>
  );
}
