const express = require("express");
const router = express.Router();
const controller = require("../controllers/authorsController");

router.get("/", controller.getAllAuthors);
router.get("/:id", controller.getAuthor);
router.post("/:id", controller.postUpdateAuthor);

module.exports = router;
