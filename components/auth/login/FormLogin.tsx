"use client";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import { toast } from "sonner";

export const FormLogin = () => {
  const [_, formAction, isPending] = useActionState(
    async (_: void | null, formData: FormData) => {
      const { email, password } = window.Object.fromEntries(formData.entries());
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email as string,
        password: password as string,
      });

      if (error) {
        toast.error(error.message);
      }

      redirect("/");
    },
    null
  );

  return (
    <form action={formAction} className="space-y-6">
      <label className="block text-sm uppercase tracking-widest mb-3">
        Correo Electronico
        <input
          type="email"
          name="email"
          className="w-full mt-1 px-4 py-3 border-2 border-black/20 hover:border-black/40 focus:border-black/60 transition-all"
          placeholder="redaccion@cronicas.com"
        />
      </label>

      <label className="block text-sm uppercase tracking-widest mb-3">
        Contraseña
        <input
          type="password"
          name="password"
          className="w-full mt-1 px-4 py-3 border-2 border-black/20 hover:border-black/40 focus:border-black/60 transition-all"
          placeholder="••••••••"
        />
      </label>
      <button
        type="submit"
        className="w-full py-3 bg-black text-white uppercase tracking-widest
                                hover:bg-gray-800 transition-all duration-300 border-2 border-black"
      >
        {isPending ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};
