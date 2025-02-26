/*
  Warnings:

  - The values [DRAFT,PRIVATE,PUBLIC] on the enum `PostType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Follower` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostType_new" AS ENUM ('ALL', 'FOLLOWER', 'ME');
ALTER TABLE "Post" ALTER COLUMN "type" DROP DEFAULT;
ALTER TABLE "Post" ALTER COLUMN "type" TYPE "PostType_new" USING ("type"::text::"PostType_new");
ALTER TYPE "PostType" RENAME TO "PostType_old";
ALTER TYPE "PostType_new" RENAME TO "PostType";
DROP TYPE "PostType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followedById_fkey";

-- DropForeignKey
ALTER TABLE "Follower" DROP CONSTRAINT "Follower_followedToId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "type" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
DROP COLUMN "type",
ADD COLUMN     "followPermission" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "Follower";

-- DropEnum
DROP TYPE "UserType";

-- CreateTable
CREATE TABLE "Follow" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Follow_followerId_idx" ON "Follow"("followerId");

-- CreateIndex
CREATE INDEX "Follow_followingId_idx" ON "Follow"("followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_followerId_followingId_key" ON "Follow"("followerId", "followingId");

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
