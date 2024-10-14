const express = require("express");

const authRouter = require("./routes/authRouter");

// App setup
const app = express();
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Session setup
const sessionConfig = require("./config/session");
const passport = require("./config/passport");
app.use(sessionConfig);
app.use(passport.session());

// Routes
app.get("/", (req, res) => res.send("Hello world!"));
app.use("/", authRouter);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
