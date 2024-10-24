const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const queries = require("../prisma/queries");

const userValidator = [
  body("username")
    .trim()
    .toLowerCase()
    .isLength({ min: 3, max: 50 })
    .withMessage("Username must be between 3 and 50 characters.")
    .isAlphanumeric()
    .withMessage("Username can only contain letters or numbers.")
    .custom(async (username) => {
      const user = await queries.getUserByUsername(username);
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at leats 5 characters long."),
];
const passwordConfirmValidator = body("passwordConfirmation")
  .custom((value, { req }) => value === req.body.password)
  .withMessage("Password and password confirmation don't match.");

const createUser = [
  userValidator,
  passwordConfirmValidator,
  asyncHandler((req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.mapped() });

    bcrypt.hash(req.body.password, 10, async (err, hashedPassowrd) => {
      if (err) throw Error("Unexpected hash error.");
      await queries.createUser(req.body.username, hashedPassowrd);
    });

    res.sendStatus(200);
  }),
];

module.exports = {
  createUser,
};
