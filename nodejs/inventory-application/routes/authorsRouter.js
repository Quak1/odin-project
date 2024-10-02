const express = require("express");
const router = express.Router();
const controller = require("../controllers/authorsController");

router.get("/", controller.allAuthorsGet);
router.get("/:id", controller.authorGet);

module.exports = router;
