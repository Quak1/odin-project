const passport = require("passport");
const localStrategy = require("./localStrategy");
const queries = require("../db/queries");

passport.use(localStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  queries
    .getUserById(userId)
    .then((user) => {
      if (!user) done(null, false);
      else done(null, user);
    })
    .catch(done);
});

module.exports = passport;
