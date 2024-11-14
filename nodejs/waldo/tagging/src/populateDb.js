#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS maps (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(50) UNIQUE,
  url TEXT
);

CREATE TABLE IF NOT EXISTS tags (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT,
  x INTEGER,
  y INTEGER,
  w INTEGER,
  h INTEGER,
  map_id INTEGER,
  FOREIGN KEY (map_id) REFERENCES maps(id) ON DELETE CASCADE
);

INSERT INTO maps (name, url) 
VALUES
  ('Pokemon', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2b67f731-a21c-4ac8-8a91-65beb31ef176/d3fvvj8-baf84b8f-e86d-4ce2-8548-6bb5ba4908b4.jpg/v1/fill/w_1600,h_2300,q_75,strp/gotta_catch__em_all___649__pokemon_poster_by_viking011_d3fvvj8-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJiNjdmNzMxLWEyMWMtNGFjOC04YTkxLTY1YmViMzFlZjE3NlwvZDNmdnZqOC1iYWY4NGI4Zi1lODZkLTRjZTItODU0OC02YmI1YmE0OTA4YjQuanBnIiwiaGVpZ2h0IjoiPD0yMzAwIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvMmI2N2Y3MzEtYTIxYy00YWM4LThhOTEtNjViZWIzMWVmMTc2XC92aWtpbmcwMTEtNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.5wSVOdWFRb51PKlAQJFHLZJA6QEjbw6T6DXNl5riW4g'),
  ('Smash Bros', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/290969cc-960f-4a67-9832-398649f79462/d1tx4w2-f7668573-71db-494e-9dc4-724fff00785c.png/v1/fill/w_943,h_593,q_80,strp/super_smash_brothers_brawl_2_by_neoriceisgood_d1tx4w2-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NTkzIiwicGF0aCI6IlwvZlwvMjkwOTY5Y2MtOTYwZi00YTY3LTk4MzItMzk4NjQ5Zjc5NDYyXC9kMXR4NHcyLWY3NjY4NTczLTcxZGItNDk0ZS05ZGM0LTcyNGZmZjAwNzg1Yy5wbmciLCJ3aWR0aCI6Ijw9OTQzIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.HwCYmbII0HIttGlLTRB2aei-YTPOQLfdUg4YQuoGrvU')
`;

async function main() {
  console.log("seeding...");
  const connectionString = process.env.DATABASE_URL;
  const client = new Client({
    connectionString,
    ssl: process.env.NODE_ENV === "production",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
