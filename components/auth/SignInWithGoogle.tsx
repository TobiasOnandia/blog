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
      className="w-full py-3 bg-white border-2 border-black/20 uppercase tracking-widest
                    hover:border-black/60 hover:bg-black/5 transition-all duration-300"
      onClick={handleClick}
    >
      Iniciar sesion con Google
    </button>
  );
};
