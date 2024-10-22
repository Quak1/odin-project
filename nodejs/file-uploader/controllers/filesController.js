const asyncHandler = require("express-async-handler");
const supabase = require("../config/supabase");
const queries = require("../db/queries");
const upload = require("../config/multer");
const NotFoundError = require("../errors/NotFoundError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { formatSize, formatDate } = require("../utils");

const { multerError } = require("../controllers/errorController");

function escapeRegex(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const filePost = [
  upload.single("file"),
  asyncHandler(async (req, res) => {
    const file = req.file;
    const username = req.user.username;
    const baseFilename = file.originalname.split(".").slice(0, -1).join(".");
    const extension = file.originalname.split(".").pop();
    const pattern = new RegExp(
      `^${escapeRegex(baseFilename)}( \\((\\d+)\\))?\\.${escapeRegex(extension)}$`,
    );

    // TODO Error handling
    const { data: existingFiles, error: existingFilesError } =
      await supabase.storage.from("file-uploader").list(username);

    const nextNumber = existingFiles.length
      ? Math.max(
          ...existingFiles
            .map((file) => {
              const match = file.name.match(pattern);
              if (match) return match[2] ?? 0;
            })
            .filter((num) => !isNaN(num)),
        ) + 1
      : null;

    const filename =
      !nextNumber || nextNumber === -Infinity
        ? file.originalname
        : `${baseFilename} (${nextNumber}).${extension}`;

    const { data, error } = await supabase.storage
      .from("file-uploader")
      .upload(`/${username}/${filename}`, file.buffer, {
        contentType: file.mimetype,
      });

    await queries.saveFile(
      req.user.id,
      req.body.folderId,
      filename,
      data.path,
      file.size,
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

const fileDownloadGet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const file = await queries.getFileById(id);

  if (!file) throw new NotFoundError();
  if (file.ownerId !== req.user.id) throw new UnauthorizedError();

  const { data } = await supabase.storage
    .from("file-uploader")
    .createSignedUrl(file.location, 30, { download: true });

  res.redirect(data.signedUrl);
});

const fileDelete = asyncHandler(async (req, res) => {
  await queries.deleteFileById(req.user.id, req.params.id);
  res.status(200).send("/");
});

module.exports = {
  filePost,
  fileDetailsGet,
  fileDownloadGet,
  fileDelete,
};
