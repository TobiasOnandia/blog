"use client";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/utils/supabase/client";

export const NavItems = [
  { label: "Inicio", href: "/", icons: {} },
  { label: "Posts", href: "/posts", icons: {} },
  { label: "Nuevo Post", href: "/posts/new", icons: {} },
  { label: "Perfil", href: "/profile", icons: {} },
];

export const Header = () => {
  const user = useUser();
  const supabase = createClient();

  return (
    <header className="sticky top-0 flex items-center justify-between  border-black/20 py-6  font-courier-prime z-50">
      {/* Título estilo cabecera de periódico */}
      <a href="/" className="flex-1  border-r border-black/20 ">
        <h1 className="text-lg font-bold uppercase tracking-widest">
          Crónicas Digitales
          <span className="block text-sm font-normal normal-case tracking-normal mt-1 text-gray-500">
            Desde 2024
          </span>
        </h1>
      </a>

      <div className="backdrop-blur-2xl absolute top-0 left-0 w-full h-full -z-10 " />

      {/* Navegación */}
      <nav className="flex-1">
        <ul className="flex justify-center items-center gap-8 text-sm uppercase tracking-wide">
          {NavItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="hover:underline decoration-2 decoration-black/50 transition-all duration-300"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sección usuario */}
      <section className="flex-1 flex flex-col justify-end items-end text-right ">
        <p className="text-xs mb-2 pb-1 border-b border-black/20 text-gray-500">
          {new Date().toLocaleDateString("es-ES", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        {user ? (
          <button
            onClick={() => supabase.auth.signOut()}
            className="cursor-pointer text-sm hover:underline decoration-black/50"
          >
            Cerrar sesión
          </button>
        ) : (
          <a
            href="/login"
            className="text-sm hover:underline decoration-black/50"
          >
            Iniciar sesión
          </a>
        )}
      </section>
    </header>
  );
};
