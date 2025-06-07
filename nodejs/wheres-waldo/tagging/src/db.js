const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === "production",
});

async function getAllMaps() {
  const { rows } = await pool.query('SELECT * FROM "Map";');
  return rows;
}

async function getMapTags(mapId) {
  const { rows } = await pool.query('SELECT * FROM "Tag" WHERE map_id = $1', [
    mapId,
  ]);
  return rows;
}

async function saveTag(tag, mapId) {
  const { rows: char } = await pool.query(
    `
WITH new_char AS (
  INSERT INTO "Character" (name, image)
  VALUES ($1, $2)
  ON CONFLICT DO NOTHING
  RETURNING id
)
SELECT id FROM new_char
UNION
SELECT id FROM "Character" WHERE name = $1;
`,
    [tag.name, ""],
  );

  const { rows } = await pool.query(
    ` INSERT INTO "Tag" (map_id, x1, y1, x2, y2, character_id)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING id, x1, y1, x2, y2
`,
    [mapId, tag.x1, tag.y1, tag.x2, tag.y2, char[0].id],
  );

  return {
    ...rows[0],
    name: char[0].id,
  };
}

module.exports = {
  getAllMaps,
  getMapTags,
  saveTag,
};
