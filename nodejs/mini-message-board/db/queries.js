const { Pool } = require("pg");

// db details are loaded from environment variables
const pool = new Pool({
  ssl: true,
});

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT id, username as user, text,\
            TO_CHAR(added, 'YYYY-MM-DD HH24:MI') as added\
     FROM messages",
  );
  return rows;
}

async function getMessageById(id) {
  const { rows } = await pool.query(
    "SELECT id, username as user, text,\
            TO_CHAR(added, 'YYYY-MM-DD HH24:MI') as added\
     FROM messages WHERE id = $1",
    [id],
  );
  return rows[0];
}

async function saveMessage(username, message) {
  await pool.query("INSERT INTO messages (username, text) VALUES ($1, $2)", [
    username,
    message,
  ]);
}

module.exports = {
  getAllMessages,
  getMessageById,
  saveMessage,
};
