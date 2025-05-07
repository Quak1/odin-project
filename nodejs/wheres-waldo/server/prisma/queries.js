const { PrismaClient } = require("../generated/prisma/client");
const prisma = new PrismaClient();

async function getRandomCharacters(mapId, n) {
  const characters = await prisma.character.findMany({
    where: {
      tag: {
        map_id: mapId,
      },
    },
  });

  return characters.sort(() => 0.5 - Math.random()).slice(0, n);
}

async function checkCharacterPosition(charId, x, y) {
  const tag = await prisma.tag.findUnique({
    where: { character_id: charId },
  });
  return x >= tag.x1 && x <= tag.x2 && y >= tag.y1 && y <= tag.y2;
}

module.exports = {
  getRandomCharacters,
  checkCharacterPosition,
};
