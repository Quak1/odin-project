const express = require("express");
const router = express.Router();
const controller = require("../controllers/filesController");

const { isAuth } = require("./isAuth");

router.use(isAuth);
router.post("/", controller.filePost);
router.get("/:id", controller.fileDetailsGet);
router.get("/:id/download", controller.fileDownloadGet);
router.delete("/:id", controller.fileDelete);

module.exports = router;
