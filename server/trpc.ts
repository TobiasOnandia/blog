import { initTRPC, TRPCError } from "@trpc/server";
import superjson from "superjson";
import { ZodError } from "zod";
import { createClient } from "@/utils/supabase/server"; // Asegúrate que este es el cliente correcto para SERVIDOR
import { cookies } from "next/headers";
import prisma from "@/lib/prisma"; // Importa tu instancia de Prisma
import { type User as SupabaseUser } from "@supabase/supabase-js"; // Importa el tipo User de Supabase si no lo tienes globalmente

interface CreateContextOptions {
  headers: Headers;
}

interface InnerContext {
  prisma: typeof prisma;
  // user será el objeto User de Supabase o null
  user: SupabaseUser | null;
  headers: Headers;
}

// --- 2. Modifica createTRPCContext ---
export const createTRPCContext = async (
  opts: CreateContextOptions
): Promise<InnerContext> => {
  const cookiesStore = cookies();
  const supabase = createClient(cookiesStore); // Cliente Supabase para servidor

  // Obtén el usuario de Supabase
  const {
    data: { user: supabaseUser },
    error: authError,
  } = await supabase.auth.getUser();

  // Loguear si hubo error de autenticación
  if (authError) {
    console.error("Supabase auth error:", authError.message);
  }

  if (supabaseUser) {
    try {
      const upsertedUser = await prisma.user.upsert({
        where: { id: supabaseUser.id }, // Clave primaria debe ser el ID de Supabase Auth
        create: {
          id: supabaseUser.id,
          email: supabaseUser.email as string,
          // Mapea otros campos: CUIDADO si no existen en metadata o en tu modelo User!
          // Usa '??' para fallbacks seguros si los campos pueden ser null/undefined
          name: supabaseUser.user_metadata?.full_name ?? supabaseUser.email, // Ejemplo: usa nombre completo o email
          // avatarUrl: supabaseUser.user_metadata?.avatar_url, // Ejemplo
        },
        update: {
          // Qué actualizar si el usuario ya existe
          email: supabaseUser.email,
          name: supabaseUser.user_metadata?.full_name ?? supabaseUser.email,
          // avatarUrl: supabaseUser.user_metadata?.avatar_url,
          // Podrías añadir un campo como 'lastLoginAt: new Date()'
        },
      });
      console.log(`Prisma user ${upsertedUser.id} upserted successfully.`);
    } catch (prismaError) {
      console.error(
        `Failed to upsert user ${supabaseUser.id} in Prisma:`,
        prismaError
      );
      // Considera qué hacer en caso de error aquí.
      // ¿Debería el usuario poder continuar si falla la sincronización?
      // Por ahora, solo logueamos el error.
    }
  }
  // Retorna el contexto con el usuario de Supabase (o null) y Prisma
  return {
    prisma,
    user: supabaseUser, // Devolvemos el objeto User de Supabase o null
    headers: opts.headers,
  };
};

// --- 3. Inicialización de tRPC ---
//    Usa el tipo `InnerContext` que definimos antes
const t = initTRPC.context<InnerContext>().create({
  transformer: superjson,
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

// --- 4. Procedimientos base y middleware ---
export const createCallerFactory = t.createCallerFactory;
export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware para proteger rutas
// Ahora `ctx.user` es el objeto User de Supabase o null
const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  // La verificación ahora es más simple y directa
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Authentication required",
    });
  }
  // Pasa el contexto sabiendo que `user` no es null
  return next({
    ctx: {
      ...ctx,
      // TypeScript sabe aquí que ctx.user no es null debido al check anterior
      user: ctx.user,
    },
  });
});

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed);

// --- Recordatorio importante ---
// Asegúrate que tu modelo `User` en `schema.prisma` use un `id` de tipo String
// para que coincida con el UUID de Supabase Auth:
//
// model User {
//   id    String  @id // <- Tipo String para UUID de Supabase
//   email String? @unique
//   name  String?
//   // avatarUrl String? // Si lo agregas
//   // lastLoginAt DateTime? // Si lo agregas
//   posts Post[]  // Relación con Posts
//
//   @@map("users") // Opcional: nombre explícito de la tabla
// }
