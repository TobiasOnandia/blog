# 🚀 BlogApp - Tu Espacio para Compartir Ideas

¡Bienvenido a BlogApp! Una moderna plataforma de blog construida con las últimas tecnologías para ofrecer una experiencia de usuario fluida y un desarrollo robusto. Comparte tus pensamientos, interactúa con la comunidad a través de comentarios anidados y gestiona tu contenido fácilmente.

## ✨ Características Principales

* 📝 **Crea y Edita Posts:** Publica tus artículos y mantén tu contenido actualizado.
* 🗣️ **Comentarios Anidados:** Fomenta discusiones detalladas y organizadas en cada post.
* 🔐 **Autenticación Segura:** Gestiona tu cuenta y protege tu contenido.
* 🛡️ **Edita Solo tus Posts:** Control total sobre tus propias publicaciones.
* 🔬 **Cubierto por Tests:** Fiabilidad garantizada con tests escritos en Vitest.
* 🔔 **Notificaciones Elegantes:** Recibe feedback instantáneo con Sonner.

## 🛠️ Tecnologías Utilizadas

Este proyecto ha sido construido utilizando un stack moderno y potente:

* **Frontend/Framework:** [Next.js 15](https://nextjs.org/) (React Framework)
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (JavaScript con tipado estático)
* **Estilos:** [Tailwind CSS](https://tailwindcss.com/) (Framework CSS utility-first)
* **Base de Datos/ORM:** [Prisma](https://www.prisma.io/) (ORM de nueva generación)
* **Backend como Servicio (Auth & DB):** [Supabase](https://supabase.io/) (Alternativa Open Source a Firebase)
* **Capa de API:** [tRPC](https://trpc.io/) (API End-to-end segura en tipos)
* **Validación de Esquemas:** [Zod](https://zod.dev/) (Declaración y validación de esquemas con tipado estático)
* **Testing:** [Vitest](https://vitest.dev/) (Framework de pruebas unitarias rápido)
* **Toasts/Notificaciones:** [Sonner](https://sonner.emrebunar.com/) (Componente Toast elegante y accesible)

*(Considera añadir badges para cada tecnología si quieres que visualmente sea más atractivo. Puedes generarlos en sitios como shields.io)*

## 🚀 Empezando

*(Aquí podrías añadir una pequeña sección explicando cómo clonar el repo, instalar dependencias y correr el proyecto localmente. Algo como:)*

1.  Clona el repositorio: git clone [[URL_DEL_REPOSITORIO]](https://github.com/TobiasOnandia/blog.git)
2.  Instala las dependencias: pnpm install (o npm install, yarn install)
3.  Configura tus variables de entorno (base de datos Supabase, etc.) en un archivo `.env`.
4.  Ejecuta las migraciones de Prisma: `pnpm prisma migrate dev`
5.  Inicia la aplicación: `pnpm dev`

## ✅ Tests

Los tests unitarios se ejecutan con Vitest. Puedes correrlos con el comando:

```bash
pnpm test
