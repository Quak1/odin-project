require("dotenv").config();
const express = require("express");

const router = require("./src/router");

// App setup
const app = express();
app.use(express.static("public"));
app.use(express.json());

// Routes
app.use(router);

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
