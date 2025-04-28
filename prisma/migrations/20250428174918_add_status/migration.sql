-- CreateEnum
CREATE TYPE "Status" AS ENUM ('BORRADOR', 'PUBLICADO');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'BORRADOR';
