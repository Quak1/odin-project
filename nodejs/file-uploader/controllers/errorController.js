const NotFoundError = require("../errors/NotFoundError");

const error = (error, req, res, next) => {
  if (error.statusCode !== 404) console.error(error);
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

module.exports = {
  error,
  notFound,
};
