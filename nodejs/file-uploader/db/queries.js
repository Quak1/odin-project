const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getUserById(id) {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
}

async function getUserPassword(username) {
  return await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      password: true,
    },
  });
}

async function createUser(username, password) {
  return await prisma.user.create({
    data: {
      username,
      password,
    },
  });
}

module.exports = {
  prismaClient: prisma,
  getUserById,
  getUserPassword,
  createUser,
};
