#! /usr/bin/env node

const fs = require("node:fs");

const {
  db,
  pgp: { helpers },
} = require("./db");
const sql = require("./sql");

const data = JSON.parse(fs.readFileSync("./db/content.json", "utf8"));
const books = data.map((genre) => genre.books).flat();

async function insertRows(data, table, column, properties = [column]) {
  const map = new Map();
  const query =
    helpers.insert(data, properties, table) +
    ` ON CONFLICT (${column}) DO NOTHING RETURNING ${column}, id;`;

  await db.each(query, [], (row) => map.set(row[column], row.id));

  return map;
}

async function main() {
  console.log("seeding...");

  // create tables
  await db.multi(sql.tables.create);

  // insert genres
  const genresMap = await insertRows(data, "genres", "genre");

  // insert authors
  const authorsMap = await insertRows(books, "authors", "author");

  // insert books
  books.forEach((book) => (book.author = authorsMap.get(book.author)));
  const booksMap = await insertRows(books, "books", "title", [
    "title",
    "author",
    "year",
    "pages",
    "cover_s",
    "cover_l",
    "description",
  ]);

  // insert book_genre
  const bookGenreData = data
    .map((genre) =>
      genre.books.map((book) => ({
        book_id: booksMap.get(book.title),
        genre_id: genresMap.get(genre.genre),
      })),
    )
    .flat();
  const bookGenreQuery = helpers.insert(
    bookGenreData,
    ["book_id", "genre_id"],
    "book_genre",
  );
  db.none(bookGenreQuery);

  db.$pool.end();
  console.log("done");
}

main();
