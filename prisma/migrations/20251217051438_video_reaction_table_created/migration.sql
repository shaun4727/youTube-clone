-- CreateEnum
CREATE TYPE "ReactionType" AS ENUM ('like', 'dislike');

-- CreateTable
CREATE TABLE "videoReactions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "reactionType" "ReactionType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videoReactions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "videoReactions" ADD CONSTRAINT "videoReactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "videoReactions" ADD CONSTRAINT "videoReactions_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "videos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
