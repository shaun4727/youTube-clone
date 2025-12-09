/*
  Warnings:

  - A unique constraint covering the columns `[muxAssetId]` on the table `videos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[muxUploadId]` on the table `videos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[muxPlaybackId]` on the table `videos` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[muxTrackId]` on the table `videos` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `muxAssetId` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muxPlaybackId` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muxTrackId` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muxTrackStatus` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muxUploadId` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "muxAssetId" TEXT NOT NULL,
ADD COLUMN     "muxPlaybackId" TEXT NOT NULL,
ADD COLUMN     "muxStatus" TEXT NOT NULL DEFAULT 'waiting',
ADD COLUMN     "muxTrackId" TEXT NOT NULL,
ADD COLUMN     "muxTrackStatus" TEXT NOT NULL,
ADD COLUMN     "muxUploadId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "videos_muxAssetId_key" ON "videos"("muxAssetId");

-- CreateIndex
CREATE UNIQUE INDEX "videos_muxUploadId_key" ON "videos"("muxUploadId");

-- CreateIndex
CREATE UNIQUE INDEX "videos_muxPlaybackId_key" ON "videos"("muxPlaybackId");

-- CreateIndex
CREATE UNIQUE INDEX "videos_muxTrackId_key" ON "videos"("muxTrackId");
