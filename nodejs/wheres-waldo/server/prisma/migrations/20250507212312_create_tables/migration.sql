-- CreateTable
CREATE TABLE "Map" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "Map_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "x1" INTEGER NOT NULL,
    "y1" INTEGER NOT NULL,
    "x2" INTEGER NOT NULL,
    "y2" INTEGER NOT NULL,
    "map_id" INTEGER NOT NULL,
    "character_id" INTEGER NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Map_name_key" ON "Map"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_character_id_key" ON "Tag"("character_id");

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_map_id_fkey" FOREIGN KEY ("map_id") REFERENCES "Map"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_character_id_fkey" FOREIGN KEY ("character_id") REFERENCES "Character"("id") ON DELETE CASCADE ON UPDATE CASCADE;
