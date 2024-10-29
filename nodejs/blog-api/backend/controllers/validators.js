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

const postValidator = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 255 })
    .withMessage("Title must be between 3 and 255 characters."),
  body("content")
    .trim()
    .isLength({ min: 20 })
    .withMessage("Post content must be at least 20 characters."),
  body("headerPicture")
    .isURL()
    .withMessage("Header picture must be a valid URL.")
    .optional(),
  body("tags")
    .isArray()
    .withMessage("Tags must be formated as an array of strings.")
    .optional()
    .default([]),
  body("published").isBoolean().withMessage("Published must be a boolean."),
];

const commentValidator = body("content")
  .isString()
  .withMessage("Message content must be a string.")
  .isLength({ max: 300 })
  .withMessage("Message length must be at most 300 characters.");

module.exports = {
  handleValidationErrors,
  usernameValidator,
  passwordValidator,
  passwordConfirmValidator,
  postValidator,
  commentValidator,
};
