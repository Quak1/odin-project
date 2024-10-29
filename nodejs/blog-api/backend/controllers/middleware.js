const passport = require("passport");

const validateJWT = passport.authenticate("jwt", {
  session: false,
  failWithError: true,
});

const errorHandler = (error, req, res, next) => {
  if (!error.statusCode && error.status !== 401) {
    console.error(error);
    error.message = "There has been an error.";
  }

  if (error.code === "ECONNREFUSED") {
    error.message = "The database seems to be down, please come back later.";
    error.statusCode = 503;
  }

  if (error.name === "AuthenticationError" && error.status === 401) {
    error.statusCode = 401;
    error.message = "";
  }

  res.status(error.statusCode || 500).json({ errors: error.message });
};

module.exports = {
  validateJWT,
  errorHandler,
};
