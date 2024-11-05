require("dotenv").config();
const express = require("express");
const cors = require("cors");

const usersRouter = require("./routes/usersRouter");
const postsRouter = require("./routes/postsRouter");
const tagsRouter = require("./routes/tagsRouter");
const { errorHandler } = require("./controllers/middleware");

// App setup
const app = express();
app.use(express.json());
require("./config/passport");
app.use(cors());

// Routes
app.get("/", (req, res) => res.sendStatus(200));
app.use("/users", usersRouter);
app.use("/posts", postsRouter);
app.use("/tags", tagsRouter);

app.use(errorHandler);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
