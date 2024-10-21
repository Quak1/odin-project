const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");
const upload = require("../config/multer");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { formatSize, formatDate } = require("../utils");

const { multerError } = require("../controllers/errorController");

const filePost = [
  upload.single("file"),
  asyncHandler(async (req, res) => {
    await queries.saveFile(
      req.user.id,
      req.body.folderId,
      req.file.originalname,
      req.file.path,
      req.file.size,
    );

    res.redirect(req.get("Referrer") || "/");
  }),
  multerError,
];

const fileDetailsGet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const file = await queries.getFileById(id);

  if (!file) throw new NotFoundError();
  if (file.ownerId !== req.user.id) throw new UnauthorizedError();

  file.size = formatSize(file.sizeInBytes);
  file.created = formatDate(file.createdAt);
  res.render("fileDetails", { title: `File | ${file.filename}`, file });
});

const fileDelete = asyncHandler(async (req, res) => {
  await queries.deleteFileById(req.user.id, req.params.id);
  res.status(200).send("/");
});

module.exports = {
  filePost,
  fileDetailsGet,
  fileDelete,
};
