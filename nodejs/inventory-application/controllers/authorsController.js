const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

const getAllAuthors = asyncHandler(async (req, res) => {
  const authors = await queries.getAllAuthors();
  res.render("authorList", { title: "Authors", authors });
});

const getAuthor = asyncHandler(async (req, res) => {
  const authorId = req.params.id;
  if (isNaN(authorId)) throw Error("Id is not a number");

  const author = await queries.getAuthorById(authorId);
  res.render("author", { title: `Author | ${author.author}`, author });
});

const postUpdateAuthor = asyncHandler(async (req, res) => {
  const { author } = req.body;
  const { id } = req.params;

  if (author) await queries.updateAuthor(id, author);

  res.redirect(`/authors/${id}`);
});

const deleteAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await queries.deleteAuthor(id);
  res.status(204).send();
});

module.exports = {
  getAllAuthors,
  getAuthor,
  postUpdateAuthor,
  deleteAuthor,
};
