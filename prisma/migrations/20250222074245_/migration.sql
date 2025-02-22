/*
  Warnings:

  - You are about to drop the column `followerId` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `followingId` on the `Follower` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[followedById,followedToId]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `followedById` to the `Follower` table without a default value. This is not possible if the table is not empty.
  - Added the required column `followedToId` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followerId_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followingId_fkey";

-- DropIndex
DROP INDEX "Follower_followerId_followingId_key";

-- DropIndex
DROP INDEX "Follower_followerId_idx";

-- DropIndex
DROP INDEX "Follower_followingId_idx";

-- AlterTable
ALTER TABLE "Follower" DROP COLUMN "followerId",
DROP COLUMN "followingId",
ADD COLUMN     "followedById" TEXT NOT NULL,
ADD COLUMN     "followedToId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Follower_followedById_idx" ON "Follower"("followedById");

-- CreateIndex
CREATE INDEX "Follower_followedToId_idx" ON "Follower"("followedToId");

-- CreateIndex
CREATE UNIQUE INDEX "Follower_followedById_followedToId_key" ON "Follower"("followedById", "followedToId");

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followedById_fkey" FOREIGN KEY ("followedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follower" ADD CONSTRAINT "Follower_followedToId_fkey" FOREIGN KEY ("followedToId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
