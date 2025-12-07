-- DropForeignKey
ALTER TABLE "videos" DROP CONSTRAINT "videos_userId_fkey";

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
