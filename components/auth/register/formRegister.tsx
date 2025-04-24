"use client";
import { createClient } from "@/utils/supabase/client";
import { useActionState } from "react";

export const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(
    async (state: void | null, formData: FormData) => {
      const { name, email, password } = window.Object.fromEntries(
        formData.entries()
      );
      const supabase = createClient();
      await supabase.auth.signUp({
        email: email as string,
        password: password as string,
        options: {
          data: {
            name: name as string,
          },
        },
      });
    },
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="block text-sm uppercase tracking-widest mb-2">
        Nombre
        <input
          type="text"
          name="name"
          className="w-full px-4 py-3 border-2 border-black/20 focus:border-black/60"
          placeholder="Nombre"
          required
        />
      </label>

      <label className="block text-sm uppercase tracking-widest mb-2">
        Correo Electrónico
        <input
          type="email"
          name="email"
          className="w-full px-4 py-3 border-2 border-black/20 focus:border-black/60"
          placeholder="corresponsal@cronicas.com"
          required
        />
      </label>

      <label className="block text-sm uppercase tracking-widest mb-2">
        Contraseña
        <input
          type="password"
          name="password"
          className="w-full px-4 py-3 border-2 border-black/20 focus:border-black/60"
          placeholder="••••••••"
          required
        />
      </label>

      <button
        type="submit"
        className="w-full py-3 bg-black text-white uppercase tracking-widest
                              hover:bg-gray-800 transition-all duration-300 border-2 border-black
                              disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Creando..." : "Crear Credenciales"}
      </button>
    </form>
  );
};
