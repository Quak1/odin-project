const LocalStrategy = require("passport-local");
const bcrypt = require("bcrypt");

const prisma = require("../prisma/client");
const errorMsg = "Incorrect username or password";

module.exports = new LocalStrategy((username, password, done) => {
  prisma.user
    .findUnique({
      where: { username: username },
      select: { id: true, password: true },
    })
    .then((user) => {
      if (!user) return done(null, false, { error: errorMsg });

      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (isMatch) return done(null, user);
          else return done(null, false, { error: errorMsg });
        })
        .catch(done);
    })
    .catch(done);
});
