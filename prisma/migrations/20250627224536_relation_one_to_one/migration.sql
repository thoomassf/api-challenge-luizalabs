/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Favorites` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Favorites_user_id_key" ON "Favorites"("user_id");
