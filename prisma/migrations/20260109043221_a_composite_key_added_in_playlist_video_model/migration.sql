/*
  Warnings:

  - A unique constraint covering the columns `[playlistId,videoId]` on the table `playlistVideos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "playlistVideos_playlistId_videoId_key" ON "playlistVideos"("playlistId", "videoId");
