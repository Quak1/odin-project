const express = require("express");
const path = require("path");

const app = express();

// serve static files
app.use(express.static("public"));

// 404 page
app.use((req, res, next) => {
  res.status(404).render(path.join(__dirname, "public", "404.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
