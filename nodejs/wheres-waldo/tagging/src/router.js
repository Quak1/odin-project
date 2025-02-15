const controller = require("./controller");
const express = require("express");
const router = express.Router();

router.get("/maps", controller.getMaps);
router.get("/maps/:mapId", controller.getTags);
router.post("/maps/:mapId", controller.postTag);

module.exports = router;
