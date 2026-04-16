const passport = require("passport");
const localStrategy = require("./localStrategy");
const prismaClient = require("../prisma/client");

passport.use(localStrategy);

passport.serializeUser((user, done) => {
  done(null, { id: user.id });
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

module.exports = passport;
