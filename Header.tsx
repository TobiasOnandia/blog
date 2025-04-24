"use client";
import { SignInWithGoogle } from "@/components/auth/SignInWithGoogle";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

export const NavItems = [
  { label: "Home", href: "/", icons: {} },
  { label: "Posts", href: "/posts", icons: {} },
  { label: "New Post", href: "/posts/new", icons: {} },
  // { label: "Profile", href: "/profile" , icons: {
  // }},
];

export const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    supabase.auth.getUser().then(({ data: { user: initialUser } }) => {
      if (!user && initialUser) {
        setUser(initialUser);
      }
      setLoading(false);
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    // onAuthStateChange detectará el logout y actualizará el estado 'user'
  };

  if (loading) {
    return <header>Verificando...</header>;
  }

  return (
    <header className="flex col-span-2  items-center gap-12  justify-between border-b border-neutral-200 py-4">
      <h1 className="text-2xl px-4">Blog</h1>
      <nav className="flex-1 px-4">
        <ul className="flex  text-xl justify-end items-center gap-4 *:hover:text-sky-500">
          {NavItems.map((item) => (
            <li className="" key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
          <li>
            {user ? (
              <button onClick={handleSignOut}>Cerrar sesion</button>
            ) : (
              <SignInWithGoogle />
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};
