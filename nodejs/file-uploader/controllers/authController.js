const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");

const passport = require("../config/passport");
const queries = require("../db/queries");

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

const signupPost = asyncHandler((req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
    if (err) throw Error("Unexpected hash error.");
    req.body.password = hashedPassword;
    await queries.createUser(req.body);
  });

  res.redirect("/login");
});

module.exports = {
  loginGet,
  loginPost,
  logoutGet,
  signupGet,
  signupPost,
};
