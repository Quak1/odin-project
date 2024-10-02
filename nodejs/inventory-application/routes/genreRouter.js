const express = require("express");
const router = express.Router();
const controller = require("../controllers/booksController");

router.get("/:genre", controller.booksByGenreGet);

module.exports = router;
