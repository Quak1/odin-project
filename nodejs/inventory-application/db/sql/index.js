const { QueryFile } = require("pg-promise");
const { join } = require("path");

// Helper for linking to external query files:
function sql(file) {
  const fullPath = join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

module.exports = {
  tables: {
    create: sql("tables/create.sql"),
  },
  books: {
    getAll: sql("books/getAll.sql"),
    getById: sql("books/getById.sql"),
    getByGenre: sql("books/getByGenre.sql"),
    getCount: sql("books/getCount.sql"),
    getCountByGenre: sql("books/getCountByGenre.sql"),
    createBook: sql("books/createBook.sql"),
    update: sql("books/update.sql"),
    addGenre: sql("books/addGenre.sql"),
    removeAllGenres: sql("books/removeAllGenres.sql"),
  },
  authors: {
    getAll: sql("authors/getAll.sql"),
    getById: sql("authors/getById.sql"),
    createAuthor: sql("authors/createAuthor.sql"),
    updateAuthor: sql("authors/updateAuthor.sql"),
  },
  genres: {
    getAll: sql("genres/getAll.sql"),
    createGenre: sql("genres/createGenre.sql"),
    updateGenre: sql("genres/updateGenre.sql"),
    delete: sql("genres/delete.sql"),
  },
};
