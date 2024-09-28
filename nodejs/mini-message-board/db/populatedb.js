#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50),
  text VARCHAR(300),
  added TIMESTAMP DEFAULT NOW()
);

INSERT INTO messages (username, text) 
VALUES
  ('Huey', 'hi'),
  ('Dewey', 'Hello world!')
`;

async function main() {
  console.log("seeding...");
  const client = new Client({ ssl: true });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
