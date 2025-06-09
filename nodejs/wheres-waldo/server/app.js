require("dotenv").config();
const express = require("express");
const app = express();

const mapRouter = require("./routes/mapRouter");
const sessionConfig = require("./config/session");
const corsConfig = require("./config/cors");
const errorHandler = require("./controllers/errorHandler");

app.set("trust proxy", true);
app.use(corsConfig);
app.use(sessionConfig);

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.use("/map", mapRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}, ${process.env.NODE_ENV}`);
});
