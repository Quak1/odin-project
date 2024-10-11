const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const queries = require("../db/queries");

const newMessageValidatior = [
  body("title")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters."),
  body("content")
    .trim()
    .exists({ values: "falsy" })
    .withMessage("Content can't be empty")
    .isLength({ min: 1, max: 300 })
    .withMessage("Content can't be longer than 300 characters"),
];

const allMessagesGet = asyncHandler(async (req, res) => {
  const messages = await queries.getAllMessages();
  res.render("messages", { title: "Messages", messages, user: req.user });
});

const createMessateGet = asyncHandler((req, res) => {
  res.render("newMessage", { title: "New message" });
});

const createMessatePost = [
  newMessageValidatior,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.render("newMessage", {
        title: "New message",
        errors: errors.mapped(),
        formData: req.body,
      });

    const { title, content } = req.body;
    await queries.createMessage(req.user.id, title, content);
    res.redirect("/");
  }),
];

module.exports = { allMessagesGet, createMessateGet, createMessatePost };
