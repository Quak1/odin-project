const asyncHandler = require("express-async-handler");
const queries = require("../db/queries");

const PAGE_SIZE = process.env.BOOKS_PAGE_SIZE;

const handlePage = (req, res, next) => {
  const page = req.query.page;

  if (!page || page == 0) req.query.page = 1;
  else if (parseInt(page) == page && page > 0) req.query.page = Number(page);
  else throw Error("page must be a positive integer");

  next();
};

const clipPage = (page, count) => {
  const total = Math.ceil(count / PAGE_SIZE);
  const current = page > total ? total : page;

  return { total, current };
};

const getAllBooks = [
  handlePage,
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

    res.render("bookGrid", { title, books, page, genres });
  }),
];

const getBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  if (isNaN(bookId)) throw Error("id must be a number");

  const book = await queries.getBookById(bookId);
  res.render("book", { title: `Book | ${book.title}`, book });
});

const getCreateBook = asyncHandler(async (req, res) => {
  const genres = await queries.getAllGenres();
  res.render("editBook", { title: "Create book", genres });
});

const postCreateBook = asyncHandler(async (req, res) => {
  const book = req.body;
  console.log(book);
  const id = await queries.createBook(book);
  res.redirect("/books/" + id);
});

const getEditBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  if (isNaN(bookId)) throw Error("id must be a number");

  const book = await queries.getBookById(bookId);
  const genres = await queries.getAllGenres();
  console.log(book);
  res.render("editBook", { title: "Edit book", book, genres });
});

const postEditBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  if (isNaN(bookId)) throw Error("id must be a number");

  const book = req.body;
  book.id = bookId;
  await queries.updateBook(book);
  res.redirect("/books/" + bookId);
});

const deleteBook = asyncHandler(async (req, res) => {});

module.exports = {
  getAllBooks,
  getBook,
  getCreateBook,
  postCreateBook,
  getEditBook,
  postEditBook,
  deleteBook,
};
