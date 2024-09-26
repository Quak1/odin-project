const express = require("express");
const path = require("path");

const errorController = require("./controllers/errorController");
const indexRouter = require("./routes/indexRouter");
const newMessageRouter = require("./routes/newMessageRouter");
const messageRouter = require("./routes/messageRouter");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/", indexRouter);
app.use("/new", newMessageRouter);
app.use("/message", messageRouter);

app.use(errorController.notFound);
app.use(errorController.error);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
