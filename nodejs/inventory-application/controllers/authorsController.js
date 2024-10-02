const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

const allAuthorsGet = asyncHandler(async (req, res) => {
  const authors = await queries.getAllAuthors();
  console.log(authors);
  res.render("authorList", { title: "Authors", authors });
});

const authorGet = asyncHandler(async (req, res) => {
  const authorId = req.params.id;
  if (isNaN(authorId)) throw Error("Id is not a number");

  const author = await queries.getAuthorById(authorId);
  console.log(author);
  res.render("author", { title: `Author | ${author.author}`, author });
});

module.exports = {
  allAuthorsGet,
  authorGet,
};
