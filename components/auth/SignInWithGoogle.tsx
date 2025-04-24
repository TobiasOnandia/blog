"use client";

import { createClient } from "@/utils/supabase/client";

export const SignInWithGoogle = () => {
  const handleClick = async () => {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  return (
    <button
      className="border border-black/20 px-3 py-1.5 text-sm hover:bg-black/5 transition-all"
      onClick={handleClick}
    >
      Iniciar sesion
    </button>
  );
};
