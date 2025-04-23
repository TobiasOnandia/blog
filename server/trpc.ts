// src/server/trpc.ts
import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { prisma } from "@/lib/prisma"; // Importa tu singleton
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
// Importa tu lógica de autenticación (ej: Clerk, NextAuth, Supabase Auth)
// import { getAuth } from '@clerk/nextjs/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Define tu contexto - aquí pasas cosas como la DB, sesión de usuario, etc.
export const createTRPCContext = async (opts: { headers: Headers }) => {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore);
  const user = await supabase.auth.getUser();

  return {
    prisma,
    user,
    headers: opts.headers,
  };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson, // Usa superjson para serialización avanzada
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

// Procedimientos base reutilizables
export const createCallerFactory = t.createCallerFactory;
export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware para proteger rutas (ejemplo)
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    // Asume que 'user' está en tu contexto si está autenticado
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      ...ctx,
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);
