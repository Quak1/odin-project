const { body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const queries = require("../prisma/queries");

const usernameValidator = () =>
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
    });

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

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.mapped() });
  else next();
};

const createUser = [
  usernameValidator(),
  passwordValidator(),
  passwordConfirmValidator(),
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await queries.createUser(req.body.username, hashedPassword);
    res.json({ id: user.id });
  }),
];

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await queries.getAllUsers();
  res.json(users);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await queries.getUserById(req.params.id);
  res.json(user);
});

const getUserPostsPublic = asyncHandler(async (req, res) => {
  const posts = await queries.getUserPublicPosts(req.params.id);
  res.json(posts);
});

const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await queries.getUserPosts(req.params.id);
  res.json(posts);
});

const updateUsername = [
  usernameValidator(),
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    await queries.updateUserUsername(req.params.id, req.body.username);
    res.json({ message: "Username updated successfully." });
  }),
];

const updatePassword = [
  passwordValidator("currentPassword"),
  passwordValidator("newPassword"),
  passwordConfirmValidator("newPasswordConfirmation", "newPassword"),
  handleValidationErrors,
  asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    // TODO return to req.user.username after auth is implemented
    const user = await queries.getUserByUsername(req.body.username);
    if (!user) throw new Error();
    if (!(await bcrypt.compare(currentPassword, user.password)))
      return res.status(403).json({
        errors: {
          currentPassword: { msg: "Current password is incorrect." },
        },
      });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await queries.updateUserPassword(req.params.id, hashedPassword);
    res.json({ message: "Password updated successfully." });
  }),
];

const deleteUser = asyncHandler(async (req, res) => {
  await queries.deleteUserById(req.params.id);
  res.sendStatus(204);
});

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  getUserPosts,
  getUserPostsPublic,
  updateUsername,
  updatePassword,
  deleteUser,
};
