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
  },
  authors: {
    getAll: sql("authors/getAll.sql"),
    getById: sql("authors/getById.sql"),
  },
  genres: {
    getBooks: sql("genres/getBooks.sql"),
  },
};
