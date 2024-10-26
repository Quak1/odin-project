const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

module.exports = new JwtStrategy(
  {
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload, done) => {
    try {
      return done(null, payload.user);
    } catch (e) {
      done(e);
    }
  },
);
