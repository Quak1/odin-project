const express = require("express");
const router = express.Router();

const controller = require("../controllers/booksController");
const idValidator = require("../middleware/idValidator");

router.get("/", controller.getAllBooks);

router.get("/create", controller.getCreateBook);
router.post("/create", controller.postCreateBook);

router.get("/:id/edit", idValidator, controller.getEditBook);
router.post("/:id/edit", idValidator, controller.postEditBook);

router.delete("/:id", idValidator, controller.deleteBook);
router.get("/:id", idValidator, controller.getBook);

module.exports = router;
