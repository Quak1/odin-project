const getDate = () => {
  return new Date().toLocaleString("en-US", {
    hour12: false,
    month: "2-digit",
    year: "numeric",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const messages = [
  {
    id: 0,
    text: "Hi there!",
    user: "Amando",
    added: getDate(),
  },
  {
    id: 1,
    text: "Hello World!",
    user: "Charles",
    added: getDate(),
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
      added: getDate(),
    });
  },
};
