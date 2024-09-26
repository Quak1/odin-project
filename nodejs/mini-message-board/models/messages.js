const messages = [
  {
    id: 0,
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    id: 1,
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

module.exports = {
  getAll: () => messages,
  get: (id) => messages[id],
  send: (author, message) => {
    if (!message.trim()) return;
    messages.push({
      id: messages.length,
      text: message,
      user: author.trim() || "Unknown",
      added: new Date(),
    });
  },
};
