const NotFoundError = require("../errors/NotFoundError");

const error = (error, req, res, next) => {
  console.error(error);
  res
    .status(error.statusCode || 500)
    .render("error", { title: error.message, message: error.message });
};

const notFound = (req, res, next) => {
  throw new NotFoundError();
};

module.exports = {
  error,
  notFound,
};
