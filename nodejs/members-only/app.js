require("dotenv").config();
const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const pgSession = require("connect-pg-simple")(expressSession);

const userRoutes = require("./routes/userRoutes");
const messagesRouter = require("./routes/messagesRoutes");

// App setup
const app = express();
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Session setup
const { pool } = require("./db/queries");
app.use(
  expressSession({
    store: new pgSession({
      pool,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }),
);

// Passport
require("./config/passport");
app.use(passport.session());

// Routes
app.use("/", (req, res, next) => {
  console.log(req.user);
  next();
});
app.use("/", messagesRouter);
app.use("/", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
