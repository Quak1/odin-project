const express = require("express");

const booksRouter = require("./routes/booksRouter");
const authorsRouter = require("./routes/authorsRouter");

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.redirect("/books"));
app.use("/books", booksRouter);
app.use("/authors", authorsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
