const express = require("express");
const router = express.Router();
const controller = require("../controllers/booksController");

router.get("/", controller.getAllBooks);

router.get("/create", controller.getCreateBook);
router.post("/create", controller.postCreateBook);

router.get("/:id/edit", controller.getEditBook);
router.post("/:id/edit", controller.postEditBook);

router.delete("/:id", controller.deleteBook);
router.get("/:id", controller.getBook);

module.exports = router;
