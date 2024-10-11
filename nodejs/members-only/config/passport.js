const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const queries = require("../db/queries");

function verify(username, password, done) {
  queries
    .getUserPassword(username)
    .then((user) => {
      if (!user)
        return done(null, false, { message: "Incorrect username or password" });

      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) return done(null, user);
          else
            return done(null, false, {
              message: "Incorrect username or password",
            });
        })
        .catch(done);
    })
    .catch(done);
}

passport.use(new LocalStrategy(verify));

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
