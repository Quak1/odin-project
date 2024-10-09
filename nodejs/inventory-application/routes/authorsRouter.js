const express = require("express");
const router = express.Router();

const controller = require("../controllers/authorsController");
const idValidator = require("../middleware/idValidator");

router.get("/", controller.getAllAuthors);

router.get("/:id", idValidator, controller.getAuthor);
router.post("/:id", idValidator, controller.postUpdateAuthor);
router.delete("/:id", idValidator, controller.deleteAuthor);

module.exports = router;
