-- CreateTable
CREATE TABLE "CommenLike" (
    "id" TEXT NOT NULL,
    "likedById" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CommenLike_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CommenLike_likedById_commentId_key" ON "CommenLike"("likedById", "commentId");

-- AddForeignKey
ALTER TABLE "CommenLike" ADD CONSTRAINT "CommenLike_likedById_fkey" FOREIGN KEY ("likedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommenLike" ADD CONSTRAINT "CommenLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;
