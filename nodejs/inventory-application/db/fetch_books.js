const fs = require("node:fs");

const GENRES = [
  "Fantasy",
  "Science Fiction",
  "Mistery",
  "Horror",
  "Historical Fiction",
  "Romance",
];
const BOOKS_PER_GENRE = 20;
const API = "https://openlibrary.org";
const COVER_BASE = "https://covers.openlibrary.org/b/id";
const FIELDS =
  "fields=" +
  [
    "key",
    "title",
    "author_name",
    "first_publish_year",
    "number_of_pages_median",
    "ratings_average",
    "editions",
    "editions.cover_i",
  ].join(",");

function getQuery(genre, language = "eng", year_from = "2000", year_to = "*") {
  const config = {
    subject: `"${genre}"`,
    language: language,
    first_publish_year: `[${year_from} TO ${year_to}]`,
  };

  const query = Object.entries(config)
    .map(([key, value]) => `${key}:${value}`)
    .join(" ");

  return "q=" + query;
}

async function fetchJSON(url) {
  return fetch(url).then((res) => res.json());
}

function makeBook(book, editionEntry) {
  if (book.key !== editionEntry.key)
    throw Error("Book and edition keys don't match");

  const cover = `${COVER_BASE}/${book.editions.docs[0].cover_i}-`;
  const description =
    editionEntry.description || "This book doesn't have a description";

  return {
    title: book.title,
    author: book.author_name[0],
    year: book.first_publish_year,
    rating: book.ratings_average.toFixed(2),
    pages: book.number_of_pages_median,
    cover_s: cover + "S.jpg",
    cover_l: cover + "L.jpg",
    description:
      typeof description === "string" ? description : description.value,
  };
}

async function fetchGenre(genre) {
  const api = `${API}/search.json?${getQuery(genre)}&${FIELDS}&limit=${BOOKS_PER_GENRE}`;
  const books = (await fetchJSON(api)).docs;

  const bookEditions = await Promise.all(
    books.map((book) => fetchJSON(`${API}${book.key}.json`)),
  );

  return {
    genre,
    books: books.map((book, i) => makeBook(book, bookEditions[i])),
  };
}

async function fetchGenres(genres = GENRES) {
  return await Promise.all(genres.map((genre) => fetchGenre(genre)));
}

async function makeFile() {
  const genres = await fetchGenres();
  const filename = "content.json";

  fs.writeFile(filename, JSON.stringify(genres), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Data written to:", filename);
    }
  });
}

module.exports = { fetchGenres, makeFile, GENRES };
