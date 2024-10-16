const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

const folderDetailsGet = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const folderId = req.params.id || null;

  const files = await queries.getUserFiles(userId, folderId);
  const folders = await queries.getUserFolders(userId, folderId);
  res.render("folder", { title: "Files", files, folders });
});

const newFolderGet = (req, res) => {
  res.render("folderCreate", {
    title: "Create new folder",
    errors: req.flash("errors"),
  });
};

const newFolderPost = asyncHandler(async (req, res) => {
  await queries.createFolder(req.user.id, req.body.name);
  res.redirect("back");
});

const folderRenamePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const folder = await queries.renameFolder(id, name);
  res.status(200).send();
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
