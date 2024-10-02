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

module.exports = {
  allBooksGet,
  booksByGenreGet,
  bookGet,
};
