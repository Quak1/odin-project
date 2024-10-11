const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const passport = require("passport");
const { body, validationResult } = require("express-validator");
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
  body("firstName")
    .isLength({ min: 1, max: 100 })
    .withMessage("First name must be between 1 and 100 characters."),
  body("lastName")
    .isLength({ min: 1, max: 100 })
    .withMessage("Last name must be between 1 and 100 characters."),
];

const signupGet = (req, res) => {
  res.render("signup", { title: "Sign up" });
};

const signupPost = [
  signUpValidator,
  asyncHandler(async (req, res) => {
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

    res.redirect("/");
  }),
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
  req.logout((error) => {
    if (error) throw error;
    res.redirect("/");
  });
};

const joinPasscodeHelper = async (req, res, title, query) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.render("join", {
      title,
      errors: errors.mapped(),
    });

  await query(req.user.id);
  res.redirect("/");
};

const memberGet = (req, res) => {
  res.render("join", { title: "Join members" });
};

const memberPost = [
  body("code")
    .equals(process.env.MEMBER_PASSCODE)
    .withMessage("Wrong passcode"),
  asyncHandler(async (req, res) => {
    await joinPasscodeHelper(req, res, "Join members", queries.setAsMember);
  }),
];

const adminGet = (req, res) => {
  res.render("join", { title: "Join admins" });
};

const adminPost = [
  body("code").equals(process.env.ADMIN_PASSCODE).withMessage("Wrong passcode"),
  asyncHandler(async (req, res) => {
    await joinPasscodeHelper(req, res, "Join admins", queries.setAsAdmin);
  }),
];

module.exports = {
  signupGet,
  signupPost,
  loginGet,
  loginPost,
  logoutGet,
  memberGet,
  memberPost,
  adminGet,
  adminPost,
};
