"use client";
import { SignInWithGoogle } from "@/utils/SignInWithGoogle";
import { createClient } from "@/utils/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

export const NavItems = [
  { label: "Home", href: "/", icons: {} },
  { label: "Posts", href: "/posts", icons: {} },
  { label: "New Post", href: "/posts/new", icons: {} },
  { label: "Profile", href: "/profile", icons: {} },
];

export const Header = () => {
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

  return (
    <header className="flex col-span-2  items-center gap-12  justify-between border-b border-neutral-200 ">
      <h1 className="text-2xl px-4">Blog</h1>
      <nav className="flex-1 px-4">
        <ul className="flex   text-xl justify-end items-center gap-4 *:hover:text-sky-500">
          {NavItems.map((item) => (
            <li className="" key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          <li>
            {user ? (
              <button onClick={() => supabase.auth.signOut()}>
                Cerrar sesion
              </button>
            ) : (
              <SignInWithGoogle />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
