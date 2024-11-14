const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === "production",
});

async function getAllMaps() {
  const { rows } = await pool.query("SELECT * FROM maps;");
  return rows;
}

async function getMapTags(mapId) {
  const { rows } = await pool.query("SELECT * FROM tags WHERE map_id = $1", [
    mapId,
  ]);
  return rows;
}

async function saveTag(tag, mapId) {
  const { rows } = await pool.query(
    "INSERT INTO tags (name, x, y, w, h, map_id)\
    VALUES ($1, $2, $3, $4, $5, $6)\
    RETURNING id, name, x, y, w, h",
    [
      tag.name,
      Math.round(tag.x),
      Math.round(tag.y),
      Math.round(tag.w),
      Math.round(tag.h),
      mapId,
    ],
  );
  return rows;
}

module.exports = {
  getAllMaps,
  getMapTags,
  saveTag,
};
