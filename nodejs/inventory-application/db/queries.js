const { db } = require("./db");
const sql = require("./sql");

const PAGE_SIZE = process.env.BOOKS_PAGE_SIZE;

// BOOKS
async function getAllBooks(page = 1, orderBy = "title", asc = true) {
  return await db.manyOrNone(sql.books.getAll, {
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

async function updateBookGenres(bookId, genres, t) {
  await t.none(sql.books.removeAllGenres, { bookId });
  const bookGenres = typeof genres === "string" ? [genres] : genres;
  const genreQueries = bookGenres.map((genreId) =>
    t.none(sql.books.addGenre, { genreId, bookId }),
  );
  await t.batch(genreQueries);
}

async function createBook(book) {
  return await db.tx(async (t) => {
    const { id: authorId } = await t.one(sql.authors.createAuthor, book);
    book.author = authorId;
    const { id: bookId } = await t.one(sql.books.createBook, book);
    await updateBookGenres(bookId, book.genre, t);
    return bookId;
  });
}

async function updateBook(book) {
  return await db.tx(async (t) => {
    const { id: authorId } = await t.one(sql.authors.createAuthor, book);
    book.author = authorId;
    const updatedBookId = await t.oneOrNone(sql.books.update, book);

    if (!updatedBookId)
      throw new Error(
        "Can't have 2 books with the same title by the same author",
      );

    const bookId = updatedBookId.id;
    await updateBookGenres(bookId, book.genre, t);

    return bookId;
  });
}

async function deleteBook(id) {
  return await db.none(sql.books.delete, { id });
}

// AUTHORS
async function getAllAuthors(asc = true) {
  return await db.manyOrNone(sql.authors.getAll, {
    order: asc ? "ASC" : "DESC",
  });
}

async function getAuthorById(id) {
  return await db.manyOrNone(sql.authors.getById, { id });
}

async function updateAuthor(id, author) {
  return await db.oneOrNone(sql.authors.updateAuthor, { id, author });
}

async function deleteAuthor(id) {
  return await db.none(sql.authors.delete, { id });
}

// GENRES
async function getAllGenres() {
  return await db.manyOrNone(sql.genres.getAll);
}

async function createGenre(genre) {
  return await db.one(sql.genres.createGenre, { genre });
}

async function updateGenre(id, genre) {
  return await db.none(sql.genres.updateGenre, { genre, id });
}

async function deleteGenre(id) {
  return await db.none(sql.genres.delete, { id });
}

module.exports = {
  getBookById,
  getAllBooks,
  getBooksByGenre,
  getBookCount,
  getBookCountByGenre,
  createBook,
  updateBook,
  deleteBook,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getAllGenres,
  createGenre,
  updateGenre,
  deleteGenre,
};
