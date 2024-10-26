const passport = require("passport");
const jwt = require("jsonwebtoken");

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
        if (!user && info) return next(new Error(info.message));
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

const validJWT = passport.authenticate("jwt", {
  session: false,
  failWithError: true,
});

const authorized = [
  validJWT,
  (req, res, next) => {
    if (req.params.id !== req.user.id) res.sendStatus(403);
    else next();
  },
];

module.exports = {
  login,
  validJWT,
  authorized,
};
