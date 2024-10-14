const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local");
const queries = require("../db/queries");

module.exports = new LocalStrategy((username, password, done) => {
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
});
