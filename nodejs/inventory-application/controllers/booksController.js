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

const allBooksGet = [
  handlePage,
  asyncHandler(async (req, res) => {
    const { count } = await queries.getBookCount();

    const page = clipPage(req.query.page, count);
    const books = await queries.getAllBooks(page.current);

    res.render("bookGrid", { title: "Books", books, page });
  }),
];

const booksByGenreGet = [
  handlePage,
  asyncHandler(async (req, res) => {
    const genre = req.params.genre;
    const { count } = await queries.getBookCountByGenre(genre);

    const page = clipPage(req.query.page, count);
    const books = await queries.getBooksByGenre(genre, page.current);

    res.render("bookGrid", { title: `${genre} Books`, books, page });
  }),
];

const bookGet = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  if (isNaN(bookId)) throw Error("id must be a number");

  const book = await queries.getBookById(bookId);
  res.render("book", { title: `Book | ${book.title}`, book });
});

const createBookGet = asyncHandler(async (req, res) => {
  const genres = await queries.getAllGenres();
  res.render("editBook", { title: "Create book", genres });
});

const createBookPost = asyncHandler(async (req, res) => {
  console.log("posted");
  res.redirect("/");
});

const bookEditGet = asyncHandler(async (req, res) => {
  const bookId = req.params.id;
  if (isNaN(bookId)) throw Error("id must be a number");

  const book = await queries.getBookById(bookId);
  const genres = await queries.getAllGenres();
  console.log(book);
  res.render("editBook", { title: "Edit book", book, genres });
});

const bookEditPost = asyncHandler(async (req, res) => {
  console.log("posted edit");
  res.redirect("/");
});

const bookDelete = asyncHandler(async (req, res) => {});

module.exports = {
  allBooksGet,
  booksByGenreGet,
  bookGet,
  createBookGet,
  createBookPost,
  bookDelete,
  bookEditGet,
  bookEditPost,
};
