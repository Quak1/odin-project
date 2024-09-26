const messages = require("../models/messages");

const get = (req, res) => {
  res.render("index", { title: "Message board", messages: messages.get() });
};

module.exports = { get };
