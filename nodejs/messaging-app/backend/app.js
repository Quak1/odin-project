const express = require("express");

// App setup
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Session setup
const sessionConfig = require("./config/session");
const passport = require("./config/passport");
app.use(sessionConfig);
app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRouter = require("./routes/authRouter");
app.use("/", authRouter);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
