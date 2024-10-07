const express = require("express");
const router = express.Router();
const controller = require("../controllers/booksController");

const idParser = require("../middleware/idParser");

router.get("/", controller.getAllBooks);

router.get("/create", controller.getCreateBook);
router.post("/create", controller.postCreateBook);

router.get("/:id/edit", idParser, controller.getEditBook);
router.post("/:id/edit", idParser, controller.postEditBook);

router.delete("/:id", idParser, controller.deleteBook);
router.get("/:id", idParser, controller.getBook);

module.exports = router;
