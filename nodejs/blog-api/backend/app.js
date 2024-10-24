require("dotenv").config();
const express = require("express");

const usersRouter = require("./routes/usersRouter");

// App setup
const app = express();
app.use(express.json());

// Routes
app.get("/", (req, res) => res.sendStatus(200));
app.use("/users", usersRouter);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
