/*
  Warnings:

  - Added the required column `h` to the `Map` table without a default value. This is not possible if the table is not empty.
  - Added the required column `w` to the `Map` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Map" 
ADD COLUMN     "h" INTEGER,
ADD COLUMN     "w" INTEGER;

UPDATE "Map"
SET "h" = 593, "w" = 943
WHERE id = 10;

UPDATE "Map"
SET "h" = 2300, "w" = 1600
WHERE id = 9;

ALTER TABLE "Map"
ALTER COLUMN "h" SET NOT NULL,
ALTER COLUMN "w" SET NOT NULL;
