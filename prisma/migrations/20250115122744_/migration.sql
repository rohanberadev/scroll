/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `Post` table. All the data in the column will be lost.
  - Added the required column `postedById` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_createdById_fkey";

-- DropIndex
DROP INDEX "Post_createdById_idx";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "createdAt",
ADD COLUMN     "commentedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "createdAt",
DROP COLUMN "createdById",
ADD COLUMN     "postedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "postedById" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Post_postedById_idx" ON "Post"("postedById");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_postedById_fkey" FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
