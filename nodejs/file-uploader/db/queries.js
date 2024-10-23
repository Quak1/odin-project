const { PrismaClient } = require("@prisma/client");
const { escapeRegex } = require("../utils");
const SupabaseError = require("../errors/SupabaseError");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");

const { supabase, bucket } = require("../config/supabase");
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

async function saveFile(owner, file, folderId) {
  const username = owner.username;
  const baseFilename = file.originalname.split(".").slice(0, -1).join(".");
  const extension = file.originalname.split(".").pop();
  const pattern = new RegExp(
    `^${escapeRegex(baseFilename)}( \\((\\d+)\\))?\\.${escapeRegex(extension)}$`,
  );

  const { data: existingFiles, error: existingFilesError } =
    await supabase.storage.from(bucket).list(username);
  if (existingFilesError) throw new SupabaseError(existingFilesError);

  const nextNumber = existingFiles?.length
    ? Math.max(
        ...existingFiles
          .map((file) => file.name.match(pattern)?.[2] ?? 0)
          .filter((num) => !isNaN(num)),
      ) + 1
    : null;

  const filename =
    !nextNumber || nextNumber === -Infinity
      ? file.originalname
      : `${baseFilename} (${nextNumber}).${extension}`;

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(`/${username}/${filename}`, file.buffer, {
      contentType: file.mimetype,
    });
  if (error) throw new SupabaseError(error);

  return await prisma.file.create({
    data: {
      owner: { connect: { id: owner.id } },
      folder: folderId ? { connect: { id: folderId } } : undefined,
      filename,
      location: data.path,
      sizeInBytes: file.size,
    },
  });
}

async function getUserFiles(ownerId, folderId = null) {
  return await prisma.file.findMany({
    where: { ownerId, folderId },
    orderBy: { filename: "asc" },
  });
}

async function getFileById(id) {
  return await prisma.file.findUnique({
    where: { id },
    include: { folder: true },
  });
}

async function deleteFileById(owner, file) {
  const { error } = await supabase.storage.from(bucket).remove([file.location]);
  if (error) throw new SupabaseError(error);
  return await prisma.file.deleteMany({
    where: { id: file.id, ownerId: owner.id },
  });
}

async function getFileDownload(file) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(file.location, 30, { download: true });
  if (error) throw new SupabaseError(error);

  return data.signedUrl;
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

async function getUserFolders(ownerId, parentId = null) {
  return await prisma.folder.findMany({
    where: { ownerId, parentId },
    orderBy: { name: "asc" },
  });
}

async function getFolderById(id) {
  if (!id) return {};
  return await prisma.folder.findUnique({
    where: { id },
    include: { parent: true },
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
  getFileDownload,
  createFolder,
  getUserFolders,
  getFolderById,
  renameFolder,
  deleteFolder,
};
