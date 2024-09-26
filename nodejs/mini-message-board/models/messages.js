const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

module.exports = {
  get: () => messages,
  send: (author, message) => {
    if (!message.trim()) return;
    messages.push({
      text: message,
      user: author.trim() || "Unknown",
      added: new Date(),
    });
  },
};
