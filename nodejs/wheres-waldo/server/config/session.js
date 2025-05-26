const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

const { prismaClient } = require("../prisma/queries");

module.exports = expressSession({
  cookie: {
    maxAge: 1 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new PrismaSessionStore(prismaClient, {
    checkPeriod: 5 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});
