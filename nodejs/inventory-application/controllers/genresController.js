const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

const queries = require("../db/queries");

const genreValidator = body("genre")
  .trim()
  .isLength({ min: 1, max: 30 })
  .withMessage("Genre must be between 1 and 30 characters")
  .isAlpha("en-US", { ignore: " " })
  .withMessage("Genre must contain only letters");

const renderGenres = async (res, locals) => {
  const genres = await queries.getAllGenres();
  res.render("genres", {
    title: "Genres",
    genres,
    ...locals,
  });
};

const getGenres = asyncHandler(async (req, res) => {
  await renderGenres(res);
});

const postCreateGenre = [
  genreValidator,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return await renderGenres(res, {
        formData: req.body,
        errors: errors.mapped(),
      });

    const { genre } = req.body;
    await queries.createGenre(genre);
    res.redirect("/genres");
  }),
];

const postUpdateGenre = [
  genreValidator,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const errors = validationResult(req);
    if (!errors.isEmpty())
      return await renderGenres(res, {
        errors: { [id]: errors.mapped().genre },
      });

    const { genre } = req.body;
    await queries.updateGenre(id, genre);
    res.redirect("/genres");
  }),
];

const deleteGenre = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await queries.deleteGenre(id);
  res.status(204).send();
});

module.exports = {
  getGenres,
  postCreateGenre,
  postUpdateGenre,
  deleteGenre,
};
