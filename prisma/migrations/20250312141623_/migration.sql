/*
  Warnings:

  - A unique constraint covering the columns `[id,sentAt]` on the table `Message` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Message_id_sentAt_key" ON "Message"("id", "sentAt");
