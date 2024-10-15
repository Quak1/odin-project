const express = require("express");
const router = express.Router();
const controller = require("../controllers/filesController");

const { isAuth } = require("./isAuth");

router.use(isAuth);
router.get("/", controller.fileGet);
router.post("/", controller.filePost);

module.exports = router;
