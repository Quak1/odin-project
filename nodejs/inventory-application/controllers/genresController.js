const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

const getGenres = asyncHandler(async (req, res) => {
  const genres = await queries.getAllGenres();
  res.render("genres", { title: "Genres", genres });
});

const postCreateGenre = asyncHandler(async (req, res) => {
  const { genre } = req.body;
  if (genre) await queries.createGenre(genre);
  res.redirect("/genres");
});

const postUpdateGenre = asyncHandler(async (req, res) => {
  const { genre } = req.body;
  const { id } = req.params;

  if (genre) await queries.updateGenre(id, genre);

  res.redirect("/genres");
});

module.exports = {
  getGenres,
  postCreateGenre,
  postUpdateGenre,
};