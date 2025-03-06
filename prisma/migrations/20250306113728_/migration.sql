/*
  Warnings:

  - A unique constraint covering the columns `[savedById,postId]` on the table `SavedPost` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SavedPost_savedById_postId_key" ON "SavedPost"("savedById", "postId");
