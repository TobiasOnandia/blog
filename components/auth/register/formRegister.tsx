"use client";
import { createClient } from "@/utils/supabase/client";
import { useActionState } from "react";
import { toast } from "sonner";

export const RegisterForm = () => {
  const [, formAction, isPending] = useActionState(
    async (_: void | null, formData: FormData) => {
      const { name, email, password } = window.Object.fromEntries(
        formData.entries()
      );
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: email as string,
        password: password as string,
        options: {
          data: {
            name: name as string,
          },
        },
      });

      if (error) {
        toast.error(error.message);
      }

      toast.success("Verificar correo electrónico");
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
          className="w-full px-4 bg-gray-200 py-3 border-2 border-black/20 focus:border-black/60"
          placeholder="Nombre"
          required
        />
      </label>

      <label className="block text-sm uppercase tracking-widest mb-2">
        Correo Electrónico
        <input
          type="email"
          name="email"
          className="w-full bg-gray-200 px-4 py-3 border-2 border-black/20 focus:border-black/60"
          placeholder="corresponsal@cronicas.com"
          required
        />
      </label>

      <label className="block text-sm uppercase tracking-widest mb-2">
        Contraseña
        <input
          type="password"
          name="password"
          className="w-full px-4 bg-gray-200 py-3 border-2 border-black/20 focus:border-black/60"
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
