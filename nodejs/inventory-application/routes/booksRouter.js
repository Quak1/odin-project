const express = require("express");
const router = express.Router();
const controller = require("../controllers/booksController");

router.get("/", controller.allBooksGet);
router.get("/:id", controller.bookGet);

module.exports = router;
