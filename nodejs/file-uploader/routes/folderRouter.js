const express = require("express");
const router = express.Router();
const controller = require("../controllers/folderController");
const { isAuth } = require("./isAuth");

router.use(isAuth);
router.get("/", controller.folderDetailsGet);
router.get("/:id", controller.folderDetailsGet);
router.get("/:id/create", controller.newFolderGet);
router.post("/:id/create", controller.newFolderPost);
router.post("/:id", controller.folderRenamePost);
router.delete("/:id", controller.folderDelete);

module.exports = router;
