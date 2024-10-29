const passport = require("passport");

const validateJWT = passport.authenticate("jwt", {
  session: false,
  failWithError: true,
});

const errorHandler = (error, req, res, next) => {
  if (!error.statusCode) {
    console.error(error);
    error.message = "There has been an error.";
  }

  if (error.code === "ECONNREFUSED") {
    error.message = "The database seems to be down, please come back later.";
    error.statusCode = 503;
  }

  res.status(error.statusCode || 500).json({ errors: error.message });
};

module.exports = {
  validateJWT,
  errorHandler,
};
