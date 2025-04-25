"use client";

import { useUser } from "@/hooks/useUser";
import { User } from "@supabase/supabase-js";

export const UserProfile = () => {
  const user = useUser() as User;

  return (
    <article className="border border-black/20 p-4">
      <h3 className="text-lg uppercase tracking-widest border-b border-black/20 pb-2 mb-4">
        Datos personales
      </h3>

      {false ? (
        <form className="space-y-4">
          <div>
            <label className="block text-sm uppercase mb-2">Nombre</label>
            <input
              type="text"
              defaultValue={user?.user_metadata?.name}
              className="w-full px-3 py-2 border border-black/20"
            />
          </div>
          <button
            type="button"
            className="text-sm uppercase hover:underline decoration-black/50"
          >
            Guardar cambios
          </button>
        </form>
      ) : (
        <div className="space-y-3 text-sm text-gray-700">
          <p>{user?.user_metadata?.name}</p>
          <p>{user?.email}</p>
          <button className="mt-4 text-sm uppercase hover:underline decoration-black/50">
            Editar perfil
          </button>
        </div>
      )}
    </article>
  );
};
