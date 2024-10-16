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

async function saveFile(owner, folderId, filename, location, sizeInBytes) {
  return await prisma.file.create({
    data: {
      owner: { connect: { id: owner } },
      folder: folderId ? { connect: { id: folderId } } : undefined,
      filename,
      location,
      sizeInBytes,
    },
  });
}

async function getUserFiles(ownerId, folderId = null) {
  return await prisma.file.findMany({
    where: { ownerId, folderId },
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

async function createFolder(ownerId, name, parentId) {
  return await prisma.folder.create({
    data: {
      ownerId,
      name,
      parentId,
    },
  });
}

async function getUserFolders(ownerId, parentId) {
  return await prisma.folder.findMany({
    where: { ownerId, parentId },
  });
}
async function getFolderById(id) {
  if (!id) return {};
  return await prisma.folder.findUnique({
    where: { id },
  });
}

async function renameFolder(id, newName) {
  return await prisma.folder.update({
    where: { id },
    data: { name: newName },
  });
}

async function deleteFolder(ownerId, folderId) {
  return await prisma.folder.deleteMany({
    where: { id: folderId, ownerId },
  });
}

module.exports = {
  prismaClient: prisma,
  getUserById,
  getUserPassword,
  createUser,
  saveFile,
  getUserFiles,
  getFileById,
  deleteFileById,
  createFolder,
  getUserFolders,
  getFolderById,
  renameFolder,
  deleteFolder,
};
