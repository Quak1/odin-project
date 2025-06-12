const passport = require("passport");
const localStrategy = require("./localStrategy");
const prismaClient = require("../prisma/client");

passport.use(localStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  prismaClient.user
    .findUnique({ where: { id: userId } })
    .then((user) => {
      if (!user) done(null, false);
      else done(null, user);
    })
    .catch(done);
});

module.exports = passport;
