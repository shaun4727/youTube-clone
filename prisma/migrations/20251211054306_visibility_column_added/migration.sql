-- CreateEnum
CREATE TYPE "VideoVisibility" AS ENUM ('PUBLIC', 'PRIVATE');

-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "visibility" "VideoVisibility" NOT NULL DEFAULT 'PRIVATE';
