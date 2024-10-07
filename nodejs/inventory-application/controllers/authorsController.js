const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const queries = require("../db/queries");
const NotFoundError = require("../errors/NotFoundError");

const authorValidator = body("author")
  .trim()
  .isLength({ min: 1, max: 100 })
  .withMessage("Author name must be between 1 and 100 characters");

const getAllAuthors = asyncHandler(async (req, res) => {
  const authors = await queries.getAllAuthors();
  res.render("authorList", {
    title: "Authors",
    authors,
  });
});

const getAuthor = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new NotFoundError();

  const { id } = req.params;
  const author = await queries.getAuthorById(id);
  if (author.length === 0) throw new NotFoundError();
  res.render("author", { title: `Author | ${author.author}`, author });
});

const postUpdateAuthor = [
  authorValidator,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send(errors);

    const { author } = req.body;
    const { id } = req.params;
    const updatedId = await queries.updateAuthor(id, author);

    if (!updatedId)
      return res.status(400).send({
        errors: [{ msg: "Can't have two authors with the same name." }],
      });

    res.status(200).send();
  }),
];

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
