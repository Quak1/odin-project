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
  return await db.manyOrNone(sql.books.getByGenre, {
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
  return await db.tx(async (t) => {
    const { id: authorId } = await t.one(sql.authors.createAuthor, book);
    book.author = authorId;
    const { id: bookId } = await t.one(sql.books.createBook, book);
    const genreQueries = book.genre.map((genreId) =>
      t.none(sql.books.addGenre, { genreId, bookId }),
    );
    await t.batch(genreQueries);
    return bookId;
  });
}

async function updateBook(book) {
  return await db.task(async (t) => {
    const { id: authorId } = await t.one(sql.authors.createAuthor, book);
    book.author = authorId;
    return await t.one(sql.books.update, book);
  });
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

async function updateAuthor(id, author) {
  return await db.none(sql.genres.updateAuthor, { id, author });
}

// GENRES
async function getAllGenres() {
  return await db.many(sql.genres.getAll);
}

async function createGenre(genre) {
  return await db.one(sql.genres.createGenre, { genre });
}

async function updateGenre(id, genre) {
  return await db.none(sql.genres.updateGenre, { genre, id });
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
  updateAuthor,
  getAllGenres,
  createGenre,
  updateGenre,
};
