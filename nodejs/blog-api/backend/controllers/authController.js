const passport = require("passport");
const jwt = require("jsonwebtoken");

const { LoginError } = require("../errors");

const {
  usernameValidator,
  passwordValidator,
  handleValidationErrors,
} = require("./validators");

const login = [
  usernameValidator(),
  passwordValidator(),
  handleValidationErrors,
  async (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
      try {
        if (!user && info) return next(new LoginError(info.message));
        if (err || !user) return next(new Error());

        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);

          const body = { id: user.id, username: user.username };
          const token = jwt.sign({ user: body }, process.env.JWT_SECRET);

          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  },
];

module.exports = {
  login,
};
