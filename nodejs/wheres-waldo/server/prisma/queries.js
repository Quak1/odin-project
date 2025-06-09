const { PrismaClient } = require("../generated/prisma/client");
const prisma = new PrismaClient();

const DISCONNECT_DELAY = process.env.PRISMA_DISCONNECT_DELAY_MS;
let disconnectTimeout = null;

const resetTimeout = () => {
  if (disconnectTimeout) clearTimeout(disconnectTimeout);
  disconnectTimeout = setTimeout(() => {
    prisma.$disconnect().then(() => {
      console.log("Prisma disconnected due to inactivity.");
    });
  }, DISCONNECT_DELAY);
};

async function getRandomCharacters(mapId, n) {
  resetTimeout();
  const characters = await prisma.character.findMany({
    where: { tag: { some: { map_id: mapId } } },
  });

  return characters.sort(() => 0.5 - Math.random()).slice(0, n);
}

async function isTagValid(mapId, charId, x, y) {
  resetTimeout();
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
  resetTimeout();
  return await prisma.map.findMany();
}

async function getTopScores(mapId, n) {
  resetTimeout();
  return await prisma.score.findMany({
    where: { map_id: mapId },
    orderBy: { score: "asc" },
    take: n,
  });
}

async function recordScore(mapId, username, score) {
  resetTimeout();
  return await prisma.score.create({
    data: {
      username,
      score,
      map: {
        connect: { id: mapId },
      },
      date: new Date(),
    },
  });
}

module.exports = {
  prismaClient: prisma,
  getRandomCharacters,
  isTagValid,
  getMapsInfo,
  getTopScores,
  recordScore,
};
