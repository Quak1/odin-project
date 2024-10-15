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

async function createUser({ username, password }) {
  return await prisma.user.create({
    data: {
      username,
      password,
    },
  });
}

async function saveFile(owner, filename, location, sizeInBytes) {
  return await prisma.file.create({
    data: {
      owner: { connect: { id: owner } },
      filename,
      location,
      sizeInBytes,
    },
  });
}

async function getFiles(owner) {
  return await prisma.file.findMany({
    where: {
      owner: {
        id: owner,
      },
    },
  });
}

async function getFileById(id) {
  return await prisma.file.findUnique({
    where: { id },
  });
}

async function deleteFileById(userId, fileId) {
  return await prisma.file.deleteMany({
    where: { id: fileId, ownerId: userId },
  });
}

module.exports = {
  prismaClient: prisma,
  getUserById,
  getUserPassword,
  createUser,
  saveFile,
  getFiles,
  getFileById,
  deleteFileById,
};
