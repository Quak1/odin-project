const express = require("express");
const path = require("path");

const indexRouter = require("./routes/indexRouter");
const newMessageRouter = require("./routes/newMessageRouter");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/new", newMessageRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
