const queries = require("../db/queries");

module.exports = {
  getAll: queries.getAllMessages,
  get: queries.getMessageById,
  send: async (author, message) => {
    if (!message.trim()) return;
    await queries.saveMessage(author.trim() || "Unknown", message);
  },
};
