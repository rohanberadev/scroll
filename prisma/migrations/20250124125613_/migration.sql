/*
  Warnings:

  - You are about to drop the `Storie` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[reportedById,reportedToId]` on the table `CommentReport` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reportedById,reportedToId]` on the table `PostReort` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reportedById,reportedToId]` on the table `UserReport` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `reportedById` to the `CommentReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportedById` to the `PostReort` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reportedById` to the `UserReport` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ONLINE', 'OFFLINE');

-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('DRAFT', 'PRIVATE', 'PUBLIC');

-- DropForeignKey
ALTER TABLE "Storie" DROP CONSTRAINT "Storie_postedById_fkey";

-- AlterTable
ALTER TABLE "CommentReport" ADD COLUMN     "reportedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "status" "PostType" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "PostReort" ADD COLUMN     "reportedById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatus" NOT NULL DEFAULT 'OFFLINE';

-- AlterTable
ALTER TABLE "UserReport" ADD COLUMN     "reportedById" TEXT NOT NULL;

-- DropTable
DROP TABLE "Storie";

-- CreateIndex
CREATE UNIQUE INDEX "CommentReport_reportedById_reportedToId_key" ON "CommentReport"("reportedById", "reportedToId");

-- CreateIndex
CREATE UNIQUE INDEX "PostReort_reportedById_reportedToId_key" ON "PostReort"("reportedById", "reportedToId");

-- CreateIndex
CREATE UNIQUE INDEX "UserReport_reportedById_reportedToId_key" ON "UserReport"("reportedById", "reportedToId");

-- AddForeignKey
ALTER TABLE "UserReport" ADD CONSTRAINT "UserReport_reportedById_fkey" FOREIGN KEY ("reportedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostReort" ADD CONSTRAINT "PostReort_reportedById_fkey" FOREIGN KEY ("reportedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentReport" ADD CONSTRAINT "CommentReport_reportedById_fkey" FOREIGN KEY ("reportedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
