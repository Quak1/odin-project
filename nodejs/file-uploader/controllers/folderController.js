const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { formatSize, formatDate } = require("../utils");

const folderDetailsGet = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const folderId = req.params.id;

  const [files, folders, folder] = await Promise.all([
    queries.getUserFiles(userId, folderId),
    queries.getUserFolders(userId, folderId),
    queries.getFolderById(folderId),
  ]);

  folders.map((folder) => (folder.created = formatDate(folder.createdAt)));
  files.map((file) => {
    file.created = formatDate(file.createdAt);
    file.size = formatSize(file.sizeInBytes);
  });

  if (!folder) throw new NotFoundError();
  if (folder.ownerId && userId !== folder.ownerId)
    throw new UnauthorizedError(
      "You do not have permission to view this folder.",
    );

  res.render("folder", { title: "Files", files, folders, folder });
});

const newFolderGet = (req, res) => {
  res.render("folderCreate", {
    title: "Create new folder",
    errors: req.flash("errors"),
  });
};

const newFolderPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await queries.createFolder(req.user.id, req.body.name, id);
  res.redirect(req.get("Referrer") || "/");
});

const folderRenamePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const folder = await queries.renameFolder(id, name);
  res.redirect(req.get("Referrer") || "/");
});

const folderDelete = asyncHandler(async (req, res) => {
  await queries.deleteFolder(req.user.id, req.params.id);
  res.status(200).send();
});

module.exports = {
  folderDetailsGet,
  newFolderGet,
  newFolderPost,
  folderRenamePost,
  folderDelete,
};
