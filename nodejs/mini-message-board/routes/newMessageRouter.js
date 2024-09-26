const express = require("express");
const router = express.Router();
const controller = require("../controllers/newMessageController");

router.get("/", controller.get);
router.post("/", controller.postMessage);

module.exports = router;
