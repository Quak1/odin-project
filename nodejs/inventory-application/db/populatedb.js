#! /usr/bin/env node

const fs = require("node:fs");
const { Client } = require("pg");
require("dotenv").config();

const { GENRES } = require("./fetch_books");
const data = JSON.parse(fs.readFileSync("./db/content.json", "utf8"));
const BOOK_COUNT = data.reduce((total, genre) => genre.books.length + total, 0);
const authors = [
  ...new Set(
    data.map((genre) => genre.books.map((book) => book.author)).flat(),
  ),
];

const TABLES = `
CREATE TABLE IF NOT EXISTS authors (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  author VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS genres (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genre VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS books (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR(100) UNIQUE NOT NULL,
  author INT REFERENCES authors(id) ON DELETE CASCADE,
  year INT NOT NULL,
  rating VARCHAR(4),
  pages INT NOT NULL,
  cover_s TEXT,
  cover_l TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS book_genre (
  book_id INT,
  genre_id INT,
  PRIMARY KEY (book_id, genre_id),
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);
`;

// expand(3, 2) returns "($1, $2), ($3, $4), ($5, $6)"
function expand(columnCount, rowCount) {
  const result = [];
  for (let i = 1; i <= rowCount * columnCount; i += columnCount) {
    const group = [];
    for (let j = 0; j < columnCount; j++) {
      group.push(`$${i + j}`);
    }
    result.push(`(${group.join(", ")})`);
  }
  return result.join(", ");
}

const GENRES_SQL = `
INSERT INTO genres (genre) 
VALUES ${GENRES.map((genre) => `('${genre}')`).join(", ")}
RETURNING id, genre;
`;

const AUTHORS_SQL = `
INSERT INTO authors (author)
VALUES ${expand(1, authors.length)}
RETURNING id, author;
`;

const BOOKS_SQL = `
INSERT INTO books (title, author, year, rating, pages, cover_s, cover_l, description)
VALUES ${expand(8, BOOK_COUNT)}
ON CONFLICT(title) DO NOTHING
RETURNING id, title;
`;

const BOOK_GENRE_SQL = `
INSERT INTO book_genre (book_id, genre_id)
VALUES ${expand(2, BOOK_COUNT)};
`;

function mapIds(rows, property) {
  const map = new Map();
  rows.forEach((row) => map.set(row[property], row.id));
  return map;
}

async function main() {
  console.log("seeding...");
  const client = new Client();
  await client.connect();

  // create tables
  await client.query(TABLES);
  // insert genres
  const newGenres = await client.query(GENRES_SQL);
  const genresMap = mapIds(newGenres.rows, "genre");
  // insert authors
  const newAuthors = await client.query(AUTHORS_SQL, authors);
  const authorsMap = mapIds(newAuthors.rows, "author");
  newAuthors.rows.forEach((author) => (authorsMap[author.author] = author.id));
  // insert books
  const bookValues = data
    .map((genre) =>
      genre.books.map((book) => [
        book.title,
        authorsMap.get(book.author),
        book.year,
        book.rating,
        book.pages,
        book.cover_s,
        book.cover_l,
        book.description,
      ]),
    )
    .flat(2);
  const newBooks = await client.query(BOOKS_SQL, bookValues);
  const booksMap = mapIds(newBooks.rows, "title");
  // insert book_genre
  const bookGenreValues = data
    .map((genre) =>
      genre.books.map((book) => [
        booksMap.get(book.title),
        genresMap.get(genre.genre),
      ]),
    )
    .flat(2);
  await client.query(BOOK_GENRE_SQL, bookGenreValues);

  await client.end();
  console.log("done");
}

main();
