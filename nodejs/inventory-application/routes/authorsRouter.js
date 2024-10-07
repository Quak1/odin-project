const express = require("express");
const router = express.Router();
const controller = require("../controllers/authorsController");

const idParser = require("../middleware/idParser");

router.get("/", controller.getAllAuthors);
router.get("/:id", idParser, controller.getAuthor);
router.post("/:id", idParser, express.json(), controller.postUpdateAuthor);
router.delete("/:id", idParser, controller.deleteAuthor);

module.exports = router;
