const errorHandler = (error, req, res, next) => {
  console.error(error);

  if (!error.statusCode) {
    error.message = "There has been a server error.";
    error.statusCode = 500;
  }

  res.status(error.statusCode).json({ error: error.message });
};

module.exports = errorHandler;
