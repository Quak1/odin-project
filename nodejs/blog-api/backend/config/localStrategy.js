const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local");
const queries = require("../prisma/queries");

module.exports = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await queries.getUserByUsername(username);
    if (!user)
      return done(null, false, {
        message: "The username or password you entered is incorrect.",
      });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return done(null, false, {
        message: "The username or password you entered is incorrect.",
      });

    return done(null, user);
  } catch (e) {
    done(e);
  }
});
