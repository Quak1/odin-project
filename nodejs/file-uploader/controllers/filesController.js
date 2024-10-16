const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");
const upload = require("../config/multer");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");

const { multerError } = require("../controllers/errorController");

const fileGet = (req, res) => {
  res.render("fileUpload", {
    title: "Upload file",
    errors: req.flash("errors"),
  });
};

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

    res.redirect("back");
  }),
  multerError,
];

const formatSize = (bytes) => {
  const sizes = ["Bytes", "KB", "MB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  const formattedSize = (bytes / Math.pow(1024, index)).toFixed(2);

  return `${formattedSize} ${sizes[index]}`;
};

const formatDate = (date) =>
  date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

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
  fileGet,
  filePost,
  fileDetailsGet,
  fileDelete,
};
