"use client"

import { createClient } from "@/utils/supabase/client";

export const SignInWithGoogle = () => {
  
    const handleClick = async () => {
    const supabase =  createClient()

     await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    }

    return (
        <button className="cursor-pointer" onClick={handleClick}>
          Iniciar sesion
        </button>
    )
}