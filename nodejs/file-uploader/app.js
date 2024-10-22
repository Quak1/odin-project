require("dotenv").config();
const express = require("express");

const errorController = require("./controllers/errorController");
const authRouter = require("./routes/authRouter");
const filesRouter = require("./routes/filesRouter");
const folderRouter = require("./routes/folderRouter");
const flash = require("./middleware/flash");

// App setup
const app = express();
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(flash());

// Session setup
const sessionConfig = require("./config/session");
const passport = require("./config/passport");
app.use(sessionConfig);
app.use(passport.session());

// Routes
app.get("/", (req, res) => res.redirect("/folder"));
app.use("/file", filesRouter);
app.use("/folder", folderRouter);
app.use("/", authRouter);

app.use(errorController.notFound);
app.use(errorController.error);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
