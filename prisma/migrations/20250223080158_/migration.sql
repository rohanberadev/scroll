-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('PRIVATE', 'PUBLIC');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'PUBLIC';
