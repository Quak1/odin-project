const { PrismaClient } = require("../generated/prisma/client");
const prisma = new PrismaClient();

async function getRandomCharacters(mapId, n) {
  const characters = await prisma.character.findMany({
    where: { tag: { some: { map_id: mapId } } },
  });

  return characters.sort(() => 0.5 - Math.random()).slice(0, n);
}

async function isTagValid(mapId, charId, x, y) {
  const tag = await prisma.tag.findUnique({
    where: {
      character_id_map_id: {
        map_id: mapId,
        character_id: charId,
      },
    },
  });

  if (x >= tag.x1 && x <= tag.x2 && y >= tag.y1 && y <= tag.y2)
    return {
      x: tag.x1,
      y: tag.y1,
      w: tag.x2 - tag.x1,
      h: tag.y2 - tag.y1,
    };
  else return null;
}

async function getMapsInfo() {
  return await prisma.map.findMany();
}

module.exports = {
  getRandomCharacters,
  isTagValid,
  getMapsInfo,
};
