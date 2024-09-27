const asyncHandler = require("express-async-handler");
const NotFoundError = require("../errors/NotFoundError");
const messages = require("../models/messages");

const get = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) throw new NotFoundError();
  const message = await messages.get(id);

  if (isNaN(id) || !message) throw new NotFoundError();

  res.render("message", { title: "Message", message });
});

module.exports = { get };
