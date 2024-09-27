const asyncHandler = require("express-async-handler");
const messages = require("../models/messages");

const get = asyncHandler(async (req, res) => {
  res.render("index", {
    title: "Message board",
    messages: await messages.getAll(),
  });
});

module.exports = { get };
