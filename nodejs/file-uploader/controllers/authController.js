const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const passport = require("../config/passport");
const queries = require("../db/queries");

const signUpValidator = [
  body("username")
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Username must be between 2 and 50 characters.")
    .isAlphanumeric()
    .withMessage("Usarname may only contain letters and numbers.")
    .custom(async (username) => {
      const user = await queries.getUserPassword(username);
      if (user) {
        throw new Error("Username already in use");
      }
    }),
  body("password")
    .isLength({ min: 3 })
    .withMessage("Password must be at least 3 characters long."),
  body("passwordConfirmation")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password and password confirmation don't match."),
];

const loginGet = (req, res) => {
  res.render("login", { title: "Log in", errors: req.session.messages });
};

const loginPost = passport.authenticate("local", {
  failureRedirect: "/login",
  successRedirect: "/",
  failureMessage: true,
});

const logoutGet = (req, res) => {
  req.logout((e) => {
    if (e) throw e;
    res.redirect("/");
  });
};

const signupGet = (req, res) => {
  res.render("signup", { title: "Sign up" });
};

const signupPost = [
  signUpValidator,
  asyncHandler((req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.render("signup", {
        title: "Sign up",
        errors: errors.mapped(),
        formData: req.body,
      });

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) throw Error("Unexpected hash error.");
      req.body.password = hashedPassword;
      await queries.createUser(req.body);
    });

    res.redirect("/login");
  }),
];

module.exports = {
  loginGet,
  loginPost,
  logoutGet,
  signupGet,
  signupPost,
};
