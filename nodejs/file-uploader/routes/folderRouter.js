const express = require("express");
const router = express.Router();
const controller = require("../controllers/folderController");
const { isAuth } = require("./isAuth");

router.use(isAuth);
router.get("/", controller.rootGet);

module.exports = router;
