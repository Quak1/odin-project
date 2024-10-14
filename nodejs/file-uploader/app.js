const express = require("express");

// App setup
const app = express();
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => res.send("Hello world!"));

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
