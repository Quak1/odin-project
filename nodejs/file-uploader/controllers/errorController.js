const NotFoundError = require("../errors/NotFoundError");

const error = (error, req, res, next) => {
  if (!error.statusCode) {
    console.error(error);
    error.message = "There was an error!";
  }
  if (error.code === "ECONNREFUSED") {
    error.message = "The database seems to be down, please come back later.";
    error.statusCode = 503;
  }

  res
    .status(error.statusCode || 500)
    .render("error", { title: error.message, error });
};

const notFound = (req, res, next) => {
  throw new NotFoundError();
};

const multerError = (error, req, res, next) => {
  if (error.code === "LIMIT_FILE_SIZE")
    req.flash("errors", "File exceeds size limit");
  else {
    console.error(error);
    req.flash("errors", "There was an error uploading the file");
  }

  res.redirect("/file");
};

module.exports = {
  error,
  notFound,
  multerError,
};
