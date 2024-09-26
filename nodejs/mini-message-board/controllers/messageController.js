const NotFoundError = require("../errors/NotFoundError");
const messages = require("../models/messages");

const get = (req, res) => {
  const id = req.params.id;
  const message = messages.get(id);

  if (isNaN(id) || !message) throw new NotFoundError();

  res.render("message", { title: "Message", message });
};

module.exports = { get };
