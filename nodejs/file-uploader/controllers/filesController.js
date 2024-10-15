const asynHandler = require("express-async-handler");
const queries = require("../db/queries");
const upload = require("../config/multer");

const { multerError } = require("../controllers/errorController");

const fileGet = (req, res) => {
  res.render("fileUpload", {
    title: "Upload file",
    errors: req.flash("errors"),
  });
};

const filePost = [
  upload.single("file"),
  asynHandler(async (req, res) => {
    await queries.saveFile(
      req.user.id,
      req.file.originalname,
      req.file.path,
      req.file.size,
    );

    res.redirect("/");
  }),
  multerError,
];

module.exports = {
  fileGet,
  filePost,
};
