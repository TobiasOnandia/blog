import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

export const useUser = () => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const handleAuthStateChange = (event: string, session: Session | null) => {
      setUser(session?.user ?? null);
      setLoading(false);
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      handleAuthStateChange
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <header>Verificando...</header>;
  }

  return user;
};
