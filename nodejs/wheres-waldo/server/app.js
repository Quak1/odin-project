const express = require("express");
const app = express();

const mapRouter = require("./routes/mapRouter");

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/map", mapRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
