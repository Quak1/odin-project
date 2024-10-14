const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

const { prismaClient } = require("../db/queries");

module.exports = expressSession({
  store: new PrismaSessionStore(prismaClient, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
});
