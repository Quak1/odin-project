const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const messages = require("../models/messages");

const get = (req, res) => {
  res.render("form", { title: "Add new message" });
};

const postMessage = [
  body("author")
    .optional({ values: "falsy" })
    .isLength({ max: 50 })
    .withMessage("'Author' max length is 50 characters"),
  body("message")
    .isLength({ min: 1, max: 300 })
    .withMessage("'Message' must be between 1 and 300 characters long"),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("form", {
        title: "Add new message",
        errors: errors.array(),
      });
    }

    await messages.send(req.body.author, req.body.message);
    res.redirect("/");
  }),
];

module.exports = {
  get,
  postMessage,
};
