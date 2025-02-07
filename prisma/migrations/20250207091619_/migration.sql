/*
  Warnings:

  - You are about to drop the column `hashtags` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `media` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_email_idx";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "hashtags",
DROP COLUMN "media",
DROP COLUMN "status",
ADD COLUMN     "mediaUrls" TEXT[],
ADD COLUMN     "type" "PostType" NOT NULL DEFAULT 'DRAFT';

-- CreateTable
CREATE TABLE "Hashtag" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "used" BIGINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hashtag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PostHashtage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Hashtag_tag_idx" ON "Hashtag"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag_tag_key" ON "Hashtag"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "_PostHashtage_AB_unique" ON "_PostHashtage"("A", "B");

-- CreateIndex
CREATE INDEX "_PostHashtage_B_index" ON "_PostHashtage"("B");

-- AddForeignKey
ALTER TABLE "_PostHashtage" ADD CONSTRAINT "_PostHashtage_A_fkey" FOREIGN KEY ("A") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PostHashtage" ADD CONSTRAINT "_PostHashtage_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
