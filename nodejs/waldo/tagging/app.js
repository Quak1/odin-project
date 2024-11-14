require("dotenv").config();
const express = require("express");

// App setup
const app = express();
app.use(express.static("public"));

// Routes

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
