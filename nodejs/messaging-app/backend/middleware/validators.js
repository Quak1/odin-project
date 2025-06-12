const { body, validationResult } = require("express-validator");
const queries = require("../prisma/queries");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, error: errors.array({ onlyFirstError: true }) });
  }

  next();
};

const loginValidator = () => [
  body("username")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("Username is required."),
  body("password")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("Password is required."),
];

const registerValidator = () => [
  body("username")
    .trim()
    .isLength({ min: 2, max: 20 })
    .withMessage("Username must be between 2 and 20 characters.")
    .isAlphanumeric()
    .withMessage("Usarname may only contain letters and numbers.")
    .custom(async (username) => {
      const exists = await queries.getUsernameId(username);
      if (exists) {
        throw new Error("Username already in use.");
      }
    }),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long."),
  body("passwordConfirmation")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password and password confirmation don't match."),
];

module.exports = {
  handleValidationErrors,
  loginValidator,
  registerValidator,
};
