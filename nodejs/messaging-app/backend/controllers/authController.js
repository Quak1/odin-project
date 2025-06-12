const bcrypt = require("bcrypt");

const passport = require("../config/passport");
const queries = require("../prisma/queries");

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user)
      return res.status(401).json({ success: false, error: info.error });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({ success: true });
    });
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  });
};

const register = (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) throw Error("Unexpected server error.");
    queries
      .createUser(req.body.username, hash)
      .then(() => res.json({ success: true }));
  });
};

module.exports = {
  login,
  logout,
  register,
};
