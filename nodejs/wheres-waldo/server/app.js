const express = require("express");
const app = express();

const mapRouter = require("./routes/mapRouter");
const tagRouter = require("./routes/tagRouter");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/map", mapRouter);
app.use("/tag", tagRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
