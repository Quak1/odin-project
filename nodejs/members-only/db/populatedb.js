#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(32) UNIQUE,
  password CHAR(60),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  is_member BOOLEAN DEFAULT FALSE,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(100),
  content VARCHAR(300),
  added TIMESTAMP DEFAULT NOW()
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({ ssl: false });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
