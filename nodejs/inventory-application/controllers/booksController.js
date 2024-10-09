const asyncHandler = require("express-async-handler");
const { body, query, validationResult } = require("express-validator");

const queries = require("../db/queries");
const NotFoundError = require("../errors/NotFoundError");

const adminPasswordValidator = require("../middleware/adminPasswordValidator");
const currentYear = new Date().getFullYear();
const bookValidator = [
  (req, res, next) => {
    for (const key in req.body) {
      if (req.body[key] === "") req.body[key] = null;
    }
    next();
  },
  body("title")
    .trim()
    .isLength({ min: 1, max: 500 })
    .withMessage("Title must be between 1 and 500 characters"),
  body("author")
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage("Author must be between 1 and 100 characters"),
  body("year")
    .optional({ values: "null" })
    .trim()
    .isInt({ min: 2000, max: currentYear })
    .withMessage(`Year must be a number between 2000 and ${currentYear}`),
  body("rating")
    .optional({ values: "null" })
    .trim()
    .isFloat({ min: 0, max: 5 })
    .withMessage("Rating must be a number between 0 and 5"),
  body("pages")
    .optional({ values: "null" })
    .trim()
    .isInt({ min: 1 })
    .withMessage("Pages must be a whole positive number"),
  body("cover_s")
    .optional({ values: "null" })
    .trim()
    .isURL()
    .withMessage("Cover small must be a valid URL"),
  body("cover_l")
    .optional({ values: "null" })
    .trim()
    .isURL()
    .withMessage("Cover large must be a valid URL"),
  body("description").optional({ values: "null" }).trim(),
  body("genre").toArray(),
];

const sortOptionsValidator = [
  query("orderBy")
    .optional({ values: "falsy" })
    .isIn(["title", "author", "year", "pages", "rating"]),
  query("ordeer").optional({ values: "falsy" }).isIn(["ASC", "DESC"]),
];

const pageParser = require("../middleware/pageParser");
const PAGE_SIZE = process.env.BOOKS_PAGE_SIZE;

const clipPage = (page, count) => {
  const total = Math.ceil(count / PAGE_SIZE) || 1;
  const current = page > total ? total : page;

  return { total, current };
};

const getAllBooks = [
  pageParser,
  sortOptionsValidator,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.redirect("/");

    const { genre, orderBy, order } = req.query;
    const asc = !order || order === "ASC";

    const { count } = genre
      ? await queries.getBookCountByGenre(genre)
      : await queries.getBookCount();

    const page = clipPage(req.query.page, count);
    const genres = await queries.getAllGenres();

    const books = genre
      ? await queries.getBooksByGenre(genre, page.current, orderBy, asc)
      : await queries.getAllBooks(page.current, orderBy, asc);

    const title = genre ? `${genre} Books` : "Books";

    res.render("bookGrid", {
      title,
      books,
      page,
      genres,
      genre,
      isMain: !genre,
    });
  }),
];

const getBook = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new NotFoundError();

  const bookId = req.params.id;
  const book = await queries.getBookById(bookId);
  if (!book) throw new NotFoundError();
  res.render("book", { title: `Book | ${book.title}`, book });
});

const renderEditBook = async (res, locals) => {
  const genres = await queries.getAllGenres();
  res.render("editBook", {
    title: "Create book",
    genres,
    ...locals,
  });
};

const getCreateBook = asyncHandler(async (req, res) => {
  await renderEditBook(res);
});

const postCreateBook = [
  bookValidator,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      await renderEditBook(res, {
        formData: req.body,
        errors: errors.mapped(),
      });
      return;
    }

    const book = req.body;
    const id = await queries.createBook(book);
    res.redirect("/books/" + id);
  }),
];

const getEditBook = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new NotFoundError();

  const bookId = req.params.id;
  const book = await queries.getBookById(bookId);
  if (!book) throw new NotFoundError();
  book.author = book.author[0];
  const genres = await queries.getAllGenres();
  res.render("editBook", { title: "Edit book", formData: book, genres });
});

const postEditBook = [
  bookValidator,
  adminPasswordValidator,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return await renderEditBook(res, {
        title: "Edit book",
        formData: req.body,
        errors: errors.mapped(),
      });
    }

    const book = req.body;
    book.id = req.params.id;
    await queries.updateBook(book);
    res.redirect("/books/" + book.id);
  }),
];

const deleteBook = [
  adminPasswordValidator,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).send(errors);

    const bookId = req.params.id;
    await queries.deleteBook(bookId);
    res.status(204).send();
  }),
];

module.exports = {
  getAllBooks,
  getBook,
  getCreateBook,
  postCreateBook,
  getEditBook,
  postEditBook,
  deleteBook,
};
