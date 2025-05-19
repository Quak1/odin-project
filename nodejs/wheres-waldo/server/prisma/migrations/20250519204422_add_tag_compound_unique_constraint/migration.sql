/*
  Warnings:

  - A unique constraint covering the columns `[character_id,map_id]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Tag_character_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Tag_character_id_map_id_key" ON "Tag"("character_id", "map_id");
