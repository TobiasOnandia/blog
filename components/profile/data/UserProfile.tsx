"use client";

import { useUser } from "@/hooks/useUser";
import { trpc } from "@/utils/trpc";
import { User } from "@supabase/supabase-js";
import { useActionState, useState } from "react";
import { toast } from "sonner";

export const UserProfile = () => {
  const user = useUser() as User;
  const utils = trpc.useUtils();
  const [isEditing, setIsEditing] = useState(false);

  console.log(user.id);

  const updateUserMutation = trpc.user.update.useMutation({
    onSuccess: () => {
      utils.user.invalidate();
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.message);
      setIsEditing(false);
    },
  });

  const [_, formAction, isLoading] = useActionState(
    (_: void | null, formData: FormData) => {
      const name = formData.get("name");
      if (!name) {
        toast.error("Por favor, ingresa un nombre");
        return;
      }

      updateUserMutation.mutate({
        name: name as string,
        id: user.id,
      });
    },
    null
  );

  const userQuery = trpc.user.byId.useQuery({ id: user.id });

  return (
    <article className="border border-black/20 p-4">
      <h3 className="text-lg uppercase tracking-widest border-b border-black/20 pb-2 mb-4">
        Datos personales
      </h3>

      {isEditing ? (
        <form action={formAction} className="space-y-4">
          <div>
            <label className="block text-sm uppercase mb-2">Nombre</label>
            <input
              name="name"
              type="text"
              defaultValue={userQuery.data?.name}
              className="w-full px-3 py-2 border border-black/20"
            />
          </div>
          <button
            type="submit"
            className="text-sm uppercase hover:underline decoration-black/50"
          >
            {isLoading ? "Cargando..." : "Guardar cambios"}
          </button>
        </form>
      ) : (
        <div className="space-y-3 text-sm text-gray-700">
          <p>{userQuery.data?.name}</p>
          <p>{user?.email}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="mt-4 text-sm uppercase hover:underline decoration-black/50"
          >
            Editar perfil
          </button>
        </div>
      )}
    </article>
  );
};
