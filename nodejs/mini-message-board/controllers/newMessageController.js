const messages = require("../models/messages");

const get = (req, res) => {
  res.render("form", { title: "Add new message" });
};

const postMessage = (req, res) => {
  messages.send(req.body.author, req.body.message);
  res.redirect("/");
};

module.exports = {
  get,
  postMessage,
};
