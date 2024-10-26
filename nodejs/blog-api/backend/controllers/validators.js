const { body } = require("express-validator");
const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.mapped() });
  else next();
};

const usernameValidator = () =>
  body("username")
    .trim()
    .toLowerCase()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters.")
    .isAlphanumeric()
    .withMessage("Username can only contain letters or numbers.");

const passwordValidator = (field = "password") =>
  body(field)
    .isLength({ min: 5 })
    .withMessage("Password must be at leats 5 characters long.");

const passwordConfirmValidator = (
  field = "passwordConfirmation",
  compare = "password",
) =>
  passwordValidator(field)
    .custom((value, { req }) => value === req.body[compare])
    .withMessage("Password and password confirmation don't match.");

module.exports = {
  handleValidationErrors,
  usernameValidator,
  passwordValidator,
  passwordConfirmValidator,
};
