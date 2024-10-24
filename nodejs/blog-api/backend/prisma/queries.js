const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function getUserByUsername(username) {
  return await prisma.user.findUnique({ where: { username } });
}

async function createUser(username, password) {
  return await prisma.user.create({ data: { username, password } });
}

module.exports = {
  getUserByUsername,
  createUser,
};
