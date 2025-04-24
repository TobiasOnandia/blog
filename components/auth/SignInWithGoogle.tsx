"use client";

import { createClient } from "@/utils/supabase/client";
import { GoogleIcon } from "@/components/icons";

export const SignInWithGoogle = ({ className }: { className: string }) => {
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
    <button className={className} onClick={handleClick}>
      Iniciar sesion con Google
      <GoogleIcon className="w-5 h-5" />
    </button>
  );
};
