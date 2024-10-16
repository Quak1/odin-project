const express = require("express");
const router = express.Router();
const controller = require("../controllers/folderController");
const { isAuth } = require("./isAuth");

router.use(isAuth);
router.get("/", controller.rootGet);
router.get("/create", controller.newFolderGet);
router.post("/create", controller.newFolderPost);
router.post("/:id", controller.folderRenamePost);
router.delete("/:id", controller.folderDelete);

module.exports = router;
