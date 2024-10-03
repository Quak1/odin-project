const { db } = require("./db");
const sql = require("./sql");

const PAGE_SIZE = process.env.BOOKS_PAGE_SIZE;

// BOOKS
async function getAllBooks(page = 1, orderBy = "title", asc = true) {
  return await db.many(sql.books.getAll, {
    orderBy,
    order: asc ? "ASC" : "DESC",
    pageSize: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });
}

async function getBooksByGenre(genre, page = 1, orderBy = "title", asc = true) {
  return await db.many(sql.books.getByGenre, {
    genre,
    orderBy,
    order: asc ? "ASC" : "DESC",
    pageSize: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
  });
}

async function getBookById(id) {
  return await db.oneOrNone(sql.books.getById, { id });
}

async function getBookCount() {
  return await db.one(sql.books.getCount);
}

async function getBookCountByGenre(genre) {
  return await db.one(sql.books.getCountByGenre, { genre });
}

async function createBook(book) {
  return await db.task(async (t) => {
    const { id: authorId } = await t.one(sql.authors.createAuthor, book);
    book.author = authorId;
    return await t.one(sql.books.createBook, book);
  });
}

async function updateBook(book) {
  return await db.one(sql.books.updateBook, { book });
}

// AUTHORS
async function getAllAuthors(asc = true) {
  return await db.many(sql.authors.getAll, {
    order: asc ? "ASC" : "DESC",
  });
}

async function getAuthorById(id) {
  return await db.many(sql.authors.getById, { id });
}

// GENRES
async function getAllGenres() {
  return await db.many(sql.genres.getAll);
}

async function createGenre(genre) {
  return await db.one(sql.genres.createGenre, { genre });
}

module.exports = {
  getBookById,
  getAllBooks,
  getBooksByGenre,
  getBookCount,
  getBookCountByGenre,
  createBook,
  updateBook,
  getAllAuthors,
  getAuthorById,
  getAllGenres,
  createGenre,
};
