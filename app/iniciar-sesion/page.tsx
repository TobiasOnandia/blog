import { useState } from "react";
import { SignInWithGoogle } from "@/components/auth/SignInWithGoogle";

export default function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 font-courier-prime"
      style={{
        background: "#fffcfc",
        backgroundImage:
          'url("https://www.transparenttextures.com/patterns/soft-wallpaper.png")',
      }}
    >
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-black/20 p-8 shadow-xl">
        <div className="mb-8 border-b border-black/20 pb-4">
          <h2 className="text-3xl font-bold uppercase tracking-widest">
            Registro
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {new Date().toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm uppercase tracking-widest mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-black/20 focus:border-black/50 
                        focus:ring-1 focus:ring-black/20 transition-all"
              required
            />
          </div>

          <div>
            <label className="block text-sm uppercase tracking-widest mb-2">
              Contraseña
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-black/20 focus:border-black/50 
                        focus:ring-1 focus:ring-black/20 transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 text-sm uppercase tracking-widest border border-black/20 
                      hover:bg-black/5 transition-all duration-300 disabled:opacity-50"
          >
            Registrarse
          </button>
        </form>

        <div className="my-6 flex items-center gap-4">
          <div className="flex-1 border-t border-black/20" />
          <span className="text-sm text-gray-500">O</span>
          <div className="flex-1 border-t border-black/20" />
        </div>

        <SignInWithGoogle />

        <div className="mt-6 text-center text-sm text-gray-600 space-y-2">
          <button className="hover:underline decoration-black/50">
            ¿Ya tienes cuenta? Inicia sesión
          </button>
          <p className="mt-2">
            <a
              href="/password-reset"
              className="hover:underline decoration-black/50"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
