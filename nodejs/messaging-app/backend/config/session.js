const expressSession = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");

const prismaClient = require("../prisma/client");

module.exports = expressSession({
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  },
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new PrismaSessionStore(prismaClient, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
});
