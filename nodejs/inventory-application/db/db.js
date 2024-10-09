require("dotenv").config();
const pgp = require("pg-promise")({
  capSQL: true,
});

const connectionDetails = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: process.env.NODE_ENV === "production",
};

const db = pgp(connectionDetails);

module.exports = { db, pgp };
