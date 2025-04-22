// src/lib/trpc/serverClient.ts (Crea un caller para el servidor)
import { httpBatchLink } from "@trpc/client";
import { appRouter } from "@/server/routers/_app";
import { createTRPCContext } from "@/server/trpc"; // Necesitas poder crear contexto en el servidor
import { headers } from "next/headers"; // Para obtener cabeceras en RSC

// Opción 1: Usando createCaller (Recomendado si puedes crear contexto fácilmente)
// export const serverClient = appRouter.createCaller(await createTRPCContext({ headers: headers() }));

// Opción 2: Usando createTRPCProxyClient (Más común en ejemplos T3)
// Necesita un link especial para RSC o llamar directamente a procedimientos
// El ejemplo de T3 usa un link custom, aquí simplificamos llamando al caller
// Nota: Crear contexto aquí puede ser complejo si depende mucho de la request
// Es más simple si tu contexto solo necesita, por ej, la DB.

// Vamos a usar createCaller que es más directo si el contexto es manejable
export const createServerCaller = async () => {
  const context = await createTRPCContext({ headers: headers() });
  return appRouter.createCaller(context);
};
