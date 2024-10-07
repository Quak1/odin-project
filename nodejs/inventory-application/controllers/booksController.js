const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");
const NotFoundError = require("../errors/NotFoundError");

const pageParser = require("../middleware/pageParser");
const PAGE_SIZE = process.env.BOOKS_PAGE_SIZE;

const clipPage = (page, count) => {
  const total = Math.ceil(count / PAGE_SIZE) || 1;
  const current = page > total ? total : page;

  return { total, current };
};

const getAllBooks = [
  pageParser,
  asyncHandler(async (req, res) => {
    const genre = req.query.genre;

    const { count } = genre
      ? await queries.getBookCountByGenre(genre)
      : await queries.getBookCount();

    const page = clipPage(req.query.page, count);
    const genres = await queries.getAllGenres();

    const books = genre
      ? await queries.getBooksByGenre(genre)
      : await queries.getAllBooks(page.current);

    const title = genre ? `${genre} Books` : "Books";

    res.render("bookGrid", { title, books, page, genres, isMain: !genre });
  }),
];

const getBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;

  const book = await queries.getBookById(bookId);
  if (!book) throw new NotFoundError();
  res.render("book", { title: `Book | ${book.title}`, book });
});

const getCreateBook = asyncHandler(async (req, res) => {
  const genres = await queries.getAllGenres();
  res.render("editBook", { title: "Create book", genres });
});

const postCreateBook = asyncHandler(async (req, res) => {
  const book = req.body;
  const id = await queries.createBook(book);
  res.redirect("/books/" + id);
});

const getEditBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;

  const book = await queries.getBookById(bookId);
  const genres = await queries.getAllGenres();
  res.render("editBook", { title: "Edit book", book, genres });
});

const postEditBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;

  const book = req.body;
  book.id = bookId;
  await queries.updateBook(book);
  res.redirect("/books/" + bookId);
});

const deleteBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;

  await queries.deleteBook(bookId);
  res.status(204).send();
});

module.exports = {
  getAllBooks,
  getBook,
  getCreateBook,
  postCreateBook,
  getEditBook,
  postEditBook,
  deleteBook,
};
