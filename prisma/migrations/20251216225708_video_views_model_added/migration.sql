-- CreateTable
CREATE TABLE "videoViews" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videoViews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "videoViews" ADD CONSTRAINT "videoViews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videoViews" ADD CONSTRAINT "videoViews_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
