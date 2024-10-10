const { Pool } = require("pg");

// db details are loaded from environment variables
const pool = new Pool({
  ssl: process.env.NODE_ENV === "development",
});

async function getAllMessages() {
  const { rows } = await pool.query(`
SELECT
  title,
  content,
  TO_CHAR(added, 'YYYY-MM-DD HH24:MI') as added
  CONCAT (first_name, ' ', last_name) as full_name,
  username
FROM 
  messages
  JOIN users ON user_id = users.id;
`);
  return rows;
}

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    "SELECT id FROM users WHERE username LIKE $1",
    [username],
  );
  return rows[0];
}

async function getUserPassword(username) {
  const { rows } = await pool.query(
    "SELECT id, password FROM users WHERE username LIKE $1",
    [username],
  );
  return rows[0];
}

async function createUser({ username, password, firstName, lastName }) {
  const { rows } = await pool.query(
    `
INSERT INTO users (username, password, first_name, last_name) 
VALUES ($1, $2, $3, $4)`,
    [username, password, firstName, lastName],
  );
  return rows;
}

async function setAsMember(id) {
  const { rows } = await pool.query(
    `
UPDATE users
SET is_member = 'true'
WHERE id = $1
RETURNING id`,
    [id],
  );
  return rows;
}

async function setAsAdmin(id) {
  const { rows } = await pool.query(
    `
UPDATE users
SET is_admin = 'true'
WHERE id = $1
RETURNING id`,
    [id],
  );
  return rows;
}

module.exports = {
  getAllMessages,
  getUserByUsername,
  getUserPassword,
  createUser,
  setAsMember,
  setAsAdmin,
};
