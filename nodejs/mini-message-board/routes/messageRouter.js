const express = require("express");
const router = express.Router();
const controller = require("../controllers/messageController");

router.get("/:id", controller.get);

module.exports = router;
